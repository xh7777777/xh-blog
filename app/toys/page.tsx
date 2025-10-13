'use client'

import { ChangeEvent, FormEvent, useState } from 'react'

type TabKey = 'elgamal' | 'diffieHellman' | 'rsa'

type Inputs = {
  p: number
  g: number
  x: number
  message: number
  r: number
}

type CalculationStep = {
  label: string
  expression: string
  value: number | string
}

const defaultInputs: Inputs = {
  p: 13,
  g: 3,
  x: 5,
  message: 6,
  r: 7,
}

type DiffieInputs = {
  p: number
  g: number
  alice: number
  bob: number
}

const defaultDiffieInputs: DiffieInputs = {
  p: 13,
  g: 7,
  alice: 5,
  bob: 11,
}

type RsaInputs = {
  p: number
  q: number
  e: number
  message: number
}

const defaultRsaInputs: RsaInputs = {
  p: 11,
  q: 13,
  e: 7,
  message: 9,
}

function modPow(base: number, exponent: number, modulus: number) {
  if (modulus <= 1) return 0
  let result = 1
  let b = ((base % modulus) + modulus) % modulus
  let e = exponent
  while (e > 0) {
    if (e % 2 === 1) {
      result = (result * b) % modulus
    }
    b = (b * b) % modulus
    e = Math.floor(e / 2)
  }
  return result
}

function extendedEuclid(a: number, b: number): [number, number, number] {
  if (b === 0) {
    return [a, 1, 0]
  }
  const [d, x1, y1] = extendedEuclid(b, a % b)
  return [d, y1, x1 - Math.floor(a / b) * y1]
}

function modInverse(value: number, modulus: number) {
  const [d, x] = extendedEuclid(value, modulus)
  if (d !== 1) return null
  return ((x % modulus) + modulus) % modulus
}

function normalizeNumber(input: string) {
  const parsed = Number.parseInt(input, 10)
  return Number.isNaN(parsed) ? 0 : parsed
}

function gcd(a: number, b: number) {
  let x = Math.abs(a)
  let y = Math.abs(b)
  while (y !== 0) {
    const temp = x % y
    x = y
    y = temp
  }
  return x
}

function isPrime(n: number) {
  if (n <= 1) return false
  if (n <= 3) return true
  if (n % 2 === 0) return n === 2
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false
  }
  return true
}

export default function ToysPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('elgamal')
  const [inputs, setInputs] = useState<Inputs>(defaultInputs)
  const [error, setError] = useState<string | null>(null)
  const [publicKeySteps, setPublicKeySteps] = useState<CalculationStep[] | null>(null)
  const [encryptionSteps, setEncryptionSteps] = useState<CalculationStep[] | null>(null)
  const [decryptionSteps, setDecryptionSteps] = useState<CalculationStep[] | null>(null)
  const [serviceNotesVisible, setServiceNotesVisible] = useState(false)
  const [dhInputs, setDhInputs] = useState<DiffieInputs>(defaultDiffieInputs)
  const [dhError, setDhError] = useState<string | null>(null)
  const [alicePublicSteps, setAlicePublicSteps] = useState<CalculationStep[] | null>(null)
  const [bobPublicSteps, setBobPublicSteps] = useState<CalculationStep[] | null>(null)
  const [sharedSecretSteps, setSharedSecretSteps] = useState<CalculationStep[] | null>(null)
  const [rsaInputs, setRsaInputs] = useState<RsaInputs>(defaultRsaInputs)
  const [rsaError, setRsaError] = useState<string | null>(null)
  const [rsaKeySteps, setRsaKeySteps] = useState<CalculationStep[] | null>(null)
  const [rsaEncryptionSteps, setRsaEncryptionSteps] = useState<CalculationStep[] | null>(null)
  const [rsaDecryptionSteps, setRsaDecryptionSteps] = useState<CalculationStep[] | null>(null)
  const tabs: { key: TabKey; label: string }[] = [
    { key: 'elgamal', label: 'El-Gamal 加密' },
    { key: 'diffieHellman', label: 'Diffie-Hellman 密钥交换' },
    { key: 'rsa', label: 'RSA 加解密' },
  ]

  const handleTabChange = (key: TabKey) => () => {
    setActiveTab(key)
  }

  const handleChange = (field: keyof Inputs) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = normalizeNumber(event.target.value)
    setInputs((prev) => ({ ...prev, [field]: value }))
  }

  const handleDiffieChange = (field: keyof DiffieInputs) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = normalizeNumber(event.target.value)
    setDhInputs((prev) => ({ ...prev, [field]: value }))
  }

  const handleRsaChange = (field: keyof RsaInputs) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = normalizeNumber(event.target.value)
    setRsaInputs((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setServiceNotesVisible(true)

    const { p, g, x, message, r } = inputs

    if (p <= 2 || g <= 1) {
      setError('p 必须是大于 2 的素数且 g 至少为 2。')
      return
    }

    const y = modPow(g, x, p)
    const c1 = modPow(g, r, p)
    const sharedSecret = modPow(y, r, p)
    const normalizedMessage = ((message % p) + p) % p
    const c2 = (normalizedMessage * sharedSecret) % p
    const secretForDecrypt = modPow(c1, x, p)
    const inverse = modInverse(secretForDecrypt, p)

    if (inverse === null) {
      setError('无法计算密钥的乘法逆元，请确认参数选择正确且满足互素条件。')
      return
    }

    const recovered = ((c2 * inverse) % p + p) % p

    setPublicKeySteps([
      {
        label: '公钥 y',
        expression: `y = g^x mod p = ${g}^${x} mod ${p}`,
        value: y,
      },
    ])

    setEncryptionSteps([
      {
        label: '随机数幂',
        expression: `c₁ = g^r mod p = ${g}^${r} mod ${p}`,
        value: c1,
      },
      {
        label: '共享密钥',
        expression: `s = y^r mod p = ${y}^${r} mod ${p}`,
        value: sharedSecret,
      },
      {
        label: '密文',
        expression: `c₂ = M · s mod p = ${message} · ${sharedSecret} mod ${p}`,
        value: c2,
      },
    ])

    setDecryptionSteps([
      {
        label: '计算共享密钥',
        expression: `s = c₁^x mod p = ${c1}^${x} mod ${p}`,
        value: secretForDecrypt,
      },
      {
        label: '计算逆元',
        expression: `s⁻¹ mod p = ${secretForDecrypt}⁻¹ mod ${p}`,
        value: inverse,
      },
      {
        label: '恢复明文',
        expression: `M = c₂ · s⁻¹ mod p = ${c2} · ${inverse} mod ${p}`,
        value: recovered,
      },
    ])
  }

  const handleDiffieSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setDhError(null)

    const { p, g, alice, bob } = dhInputs

    if (p <= 2 || g <= 1) {
      setDhError('p 必须是大于 2 的素数且 g 至少为 2。')
      return
    }

    const alicePublic = modPow(g, alice, p)
    const bobPublic = modPow(g, bob, p)
    const sharedByAlice = modPow(bobPublic, alice, p)
    const sharedByBob = modPow(alicePublic, bob, p)

    setAlicePublicSteps([
      {
        label: 'Alice 公钥',
        expression: `A = g^x mod p = ${g}^${alice} mod ${p}`,
        value: alicePublic,
      },
    ])

    setBobPublicSteps([
      {
        label: 'Bob 公钥',
        expression: `B = g^y mod p = ${g}^${bob} mod ${p}`,
        value: bobPublic,
      },
    ])

    setSharedSecretSteps([
      {
        label: 'Alice 计算共享密钥',
        expression: `K_A = B^x mod p = ${bobPublic}^${alice} mod ${p}`,
        value: sharedByAlice,
      },
      {
        label: 'Bob 计算共享密钥',
        expression: `K_B = A^y mod p = ${alicePublic}^${bob} mod ${p}`,
        value: sharedByBob,
      },
    ])
  }

  const handleRsaSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setRsaError(null)

    const { p, q, e, message } = rsaInputs

    if (!isPrime(p) || !isPrime(q)) {
      setRsaError('p 与 q 必须为素数且大于 1。')
      return
    }

    if (p === q) {
      setRsaError('为确保安全性，请选择不同的素数 p 和 q。')
      return
    }

    if (e <= 1) {
      setRsaError('e 必须是大于 1 的整数。')
      return
    }

    const n = p * q
    const phi = (p - 1) * (q - 1)

    if (phi <= 0) {
      setRsaError('参数异常：φ(n) 需要为正数。')
      return
    }

    if (gcd(e, phi) !== 1) {
      setRsaError(`e = ${e} 与 φ(n) = ${phi} 不是互素，请重新选择 e。`)
      return
    }

    const d = modInverse(e, phi)

    if (d === null) {
      setRsaError('无法为给定的 e 计算乘法逆元 d，请重新选择 e。')
      return
    }

    const normalizedMessage = ((message % n) + n) % n
    const cipher = modPow(normalizedMessage, e, n)
    const recovered = modPow(cipher, d, n)

    setRsaKeySteps([
      {
        label: '模数 n',
        expression: `n = p · q = ${p} · ${q}`,
        value: n,
      },
      {
        label: '欧拉函数 φ(n)',
        expression: `φ(n) = (p - 1)(q - 1) = (${p} - 1)(${q} - 1)`,
        value: phi,
      },
      {
        label: '私钥 d',
        expression: `d = e⁻¹ mod φ(n) = ${e}⁻¹ mod ${phi}`,
        value: d,
      },
    ])

    setRsaEncryptionSteps([
      {
        label: '归一化明文',
        expression: `m = M mod n = ${message} mod ${n}`,
        value: normalizedMessage,
      },
      {
        label: '密文',
        expression: `c = m^e mod n = ${normalizedMessage}^${e} mod ${n}`,
        value: cipher,
      },
    ])

    setRsaDecryptionSteps([
      {
        label: '解密操作',
        expression: `m = c^d mod n = ${cipher}^${d} mod ${n}`,
        value: recovered,
      },
      {
        label: '还原明文',
        expression: 'M = m',
        value: recovered,
      },
    ])
  }

  const cipherPreview = (() => {
    if (!encryptionSteps) return null
    const c1 = encryptionSteps[0]?.value
    const c2 = encryptionSteps[2]?.value
    if (typeof c1 === 'number' && typeof c2 === 'number') {
      return `密文对 (c₁, c₂) = (${c1}, ${c2})`
    }
    return null
  })()

  const diffieHighlight = (() => {
    if (!sharedSecretSteps || sharedSecretSteps.length < 2) return null
    const aliceShared = sharedSecretSteps[0]?.value
    const bobShared = sharedSecretSteps[1]?.value
    if (typeof aliceShared === 'number' && typeof bobShared === 'number') {
      if (aliceShared === bobShared) {
        return `共享密钥 K = ${aliceShared}`
      }
      return `警告：Alice 计算 ${aliceShared}，Bob 计算 ${bobShared}`
    }
    return null
  })()

  const rsaCipherHighlight = (() => {
    if (!rsaEncryptionSteps || rsaEncryptionSteps.length < 2) return null
    const cipherValue = rsaEncryptionSteps[1]?.value
    if (typeof cipherValue === 'number') {
      return `密文 c = ${cipherValue}`
    }
    return null
  })()

  const rsaPlainHighlight = (() => {
    if (!rsaDecryptionSteps || rsaDecryptionSteps.length === 0) return null
    const recovered = rsaDecryptionSteps[rsaDecryptionSteps.length - 1]?.value
    if (typeof recovered === 'number') {
      return `恢复明文 M = ${recovered}`
    }
    return null
  })()

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">El-Gamal、Diffie-Hellman 与 RSA 可视化工具</h1>
        <p className="text-sm text-neutral-600">
          使用下方标签可在三种经典公钥算法之间切换，输入参数后查看详细的计算推导过程。
        </p>
      </header>

      <nav className="flex gap-2 rounded-lg bg-neutral-100 p-1 text-sm">
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab
          return (
            <button
              key={tab.key}
              type="button"
              onClick={handleTabChange(tab.key)}
              className={`flex-1 rounded-md px-4 py-2 font-medium transition ${
                isActive ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </nav>

      {activeTab === 'elgamal' && (
        <>
          <form onSubmit={handleSubmit} className="grid gap-4 rounded-lg border border-neutral-200 p-4 shadow-sm">
            <fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm">
                <span>p（模数，质数）</span>
                <input
                  className="rounded border border-neutral-300 px-2 py-1"
                  type="number"
                  value={inputs.p}
                  onChange={handleChange('p')}
                  min={3}
                  required
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span>g（生成元）</span>
                <input
                  className="rounded border border-neutral-300 px-2 py-1"
                  type="number"
                  value={inputs.g}
                  onChange={handleChange('g')}
                  min={2}
                  required
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span>x（私钥）</span>
                <input
                  className="rounded border border-neutral-300 px-2 py-1"
                  type="number"
                  value={inputs.x}
                  onChange={handleChange('x')}
                  min={1}
                  required
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span>M（明文）</span>
                <input
                  className="rounded border border-neutral-300 px-2 py-1"
                  type="number"
                  value={inputs.message}
                  onChange={handleChange('message')}
                  min={0}
                  required
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span>r（随机数）</span>
                <input
                  className="rounded border border-neutral-300 px-2 py-1"
                  type="number"
                  value={inputs.r}
                  onChange={handleChange('r')}
                  min={1}
                  required
                />
              </label>
            </fieldset>

            <button
              type="submit"
              className="rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
            >
              立即计算
            </button>

            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>

          <section className="space-y-4">
            <CalculationSection title="公钥计算" steps={publicKeySteps} />
            <CalculationSection title="加密过程" steps={encryptionSteps} highlight={cipherPreview} />
            <CalculationSection title="解密验证" steps={decryptionSteps} />
          </section>

          {serviceNotesVisible && (
            <section className="rounded-lg border border-neutral-200 p-4 text-sm text-neutral-700">
              <h2 className="text-base font-semibold">El-Gamal 能提供的安全服务</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>保密性：随机数 r 的引入确保相同明文每次加密都会产生不同密文。</li>
                <li>完整性与认证：结合哈希和签名流程，可以构建 El-Gamal 数字签名，验证消息未被篡改且来自合法持有私钥的实体。</li>
                <li>不可否认性：数字签名使签名者难以否认其签名的真实性。</li>
              </ul>
            </section>
          )}
        </>
      )}

      {activeTab === 'diffieHellman' && (
        <>
          <form
            onSubmit={handleDiffieSubmit}
            className="grid gap-4 rounded-lg border border-neutral-200 p-4 shadow-sm"
          >
            <fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm">
                <span>p（模数，质数）</span>
                <input
                  className="rounded border border-neutral-300 px-2 py-1"
                  type="number"
                  value={dhInputs.p}
                  onChange={handleDiffieChange('p')}
                  min={3}
                  required
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span>g（生成元）</span>
                <input
                  className="rounded border border-neutral-300 px-2 py-1"
                  type="number"
                  value={dhInputs.g}
                  onChange={handleDiffieChange('g')}
                  min={2}
                  required
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span>Alice 的私钥 x</span>
                <input
                  className="rounded border border-neutral-300 px-2 py-1"
                  type="number"
                  value={dhInputs.alice}
                  onChange={handleDiffieChange('alice')}
                  min={1}
                  required
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span>Bob 的私钥 y</span>
                <input
                  className="rounded border border-neutral-300 px-2 py-1"
                  type="number"
                  value={dhInputs.bob}
                  onChange={handleDiffieChange('bob')}
                  min={1}
                  required
                />
              </label>
            </fieldset>

            <button
              type="submit"
              className="rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
            >
              立即计算
            </button>

            {dhError && <p className="text-sm text-red-600">{dhError}</p>}
          </form>

          <section className="space-y-4">
            <CalculationSection title="Alice 公钥" steps={alicePublicSteps} />
            <CalculationSection title="Bob 公钥" steps={bobPublicSteps} />
            <CalculationSection title="共享密钥" steps={sharedSecretSteps} highlight={diffieHighlight} />
          </section>

          <section className="rounded-lg border border-neutral-200 p-4 text-sm text-neutral-700">
            <h2 className="text-base font-semibold">Diffie-Hellman 交换提示</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>双方公开 A 与 B，用以协同计算共享密钥；私钥 x、y 不需要传输。</li>
              <li>共享密钥用于对称加密或消息验证，需选取足够大的模数 p 以抵御离散对数攻击。</li>
            </ul>
          </section>
        </>
      )}

      {activeTab === 'rsa' && (
        <>
          <form onSubmit={handleRsaSubmit} className="grid gap-4 rounded-lg border border-neutral-200 p-4 shadow-sm">
            <fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm">
                <span>p（素数）</span>
                <input
                  className="rounded border border-neutral-300 px-2 py-1"
                  type="number"
                  value={rsaInputs.p}
                  onChange={handleRsaChange('p')}
                  min={2}
                  required
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span>q（素数）</span>
                <input
                  className="rounded border border-neutral-300 px-2 py-1"
                  type="number"
                  value={rsaInputs.q}
                  onChange={handleRsaChange('q')}
                  min={2}
                  required
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span>e（公钥指数）</span>
                <input
                  className="rounded border border-neutral-300 px-2 py-1"
                  type="number"
                  value={rsaInputs.e}
                  onChange={handleRsaChange('e')}
                  min={2}
                  required
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span>M（明文，低于 n）</span>
                <input
                  className="rounded border border-neutral-300 px-2 py-1"
                  type="number"
                  value={rsaInputs.message}
                  onChange={handleRsaChange('message')}
                  min={0}
                  required
                />
              </label>
            </fieldset>

            <button
              type="submit"
              className="rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
            >
              立即计算
            </button>

            {rsaError && <p className="text-sm text-red-600">{rsaError}</p>}
          </form>

          <section className="space-y-4">
            <CalculationSection title="密钥生成" steps={rsaKeySteps} />
            <CalculationSection title="加密过程" steps={rsaEncryptionSteps} highlight={rsaCipherHighlight} />
            <CalculationSection title="解密验证" steps={rsaDecryptionSteps} highlight={rsaPlainHighlight} />
          </section>

          <section className="rounded-lg border border-neutral-200 p-4 text-sm text-neutral-700">
            <h2 className="text-base font-semibold">RSA 使用提示</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>选择大素数 p、q 可显著提升安全性，实际应用中应远大于示例。</li>
              <li>指数 e 需与 φ(n) 互素，常选 65537，示例中使用较小数便于展示计算过程。</li>
              <li>共享的密钥对为 (n, e)，私钥 d 仅由拥有者保管，用于解密或签名。</li>
            </ul>
          </section>
        </>
      )}

      <footer className="rounded-lg border border-dashed border-neutral-300 p-4 text-xs text-neutral-500">
        <p>
          题源：El-Gamal (2-3-3-2)——考虑模数 p = 13、生成元 g = 3 的 El-Gamal 加密，给定私钥 x = 5、明文 M = 6
          与随机参数 r = 7，计算公钥、加密结果并通过解密验证。
        </p>
        <p className="mt-2">
          题源：Diffie-Hellman (2-2-2-6)——考虑模数 p = 13、生成元 g = 7，Alice 取私钥 x = 5，Bob 取私钥 y = 11，求各自发送的公钥并验证共享密钥。
        </p>
        <p className="mt-2">
          题源：RSA——给定素数 p、q 以及公钥指数 e，构造模数 n、求解私钥 d，并对明文 M 进行加密与解密验证。
        </p>
      </footer>
    </div>
  )
}

function CalculationSection({
  title,
  steps,
  highlight,
}: {
  title: string
  steps: CalculationStep[] | null
  highlight?: string | null
}) {
  if (!steps) {
    return (
      <div className="rounded-lg border border-dashed border-neutral-200 p-4 text-sm text-neutral-500">
        尚未计算 {title}
      </div>
    )
  }

  return (
    <div className="space-y-3 rounded-lg border border-neutral-200 p-4">
      <h2 className="text-base font-semibold">{title}</h2>
      <ol className="space-y-2 text-sm">
        {steps.map((step) => (
          <li key={step.label} className="space-y-1">
            <div className="font-medium">{step.label}</div>
            <div className="text-neutral-600">{step.expression}</div>
            <div>
              结果：<span className="font-semibold">{step.value}</span>
            </div>
          </li>
        ))}
      </ol>
      {highlight && <div className="text-sm font-medium text-emerald-600">{highlight}</div>}
    </div>
  )
}

// **El-Gamal (2-3-3-2)** Consider the El-Gamal encryption scheme and let *p* = 13 and *g* = 3

// (a) Suppose the private key is *x* = 5. Compute the public key *y*.

// (b) Encrypt the message *M* = 6 using the public key above and *r* = 7.

// (c) Verify your calculation in part (b) above by decrypting the ciphertect you obtained in part (b)

// (d) What security services can you provide using the El-Gamal algorithm shown in the class notes?
