import { useQuery } from '@tanstack/react-query'
import { getPosts } from 'api/entries'

export default function usePosts(max_display: number = 5) {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['posts'],
        queryFn: () => getPosts(0, max_display),
      })
    
      if (isPending) {
        return []
      }
    
      if (isError) {
        return <span>Error: {error.message}</span>
      }
      const posts = data.data.data;

      return posts;
}