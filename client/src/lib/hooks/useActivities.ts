import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import agent from "../api/agent"
import { useLocation } from "react-router"

export const useActivities = (id?: string) => {

    const queryClient = useQueryClient()
    const location = useLocation()

    const { data: activities, isPending } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            return agent.get<Activity[]>('/activities').then(response => response.data)
        },
        // staleTime: 5 * 60 * 1000 //5 minutes
        enabled: !id && location.pathname === '/activities'
    })

    const { data: activity, isLoading: isLoadingActivity } = useQuery({
        queryKey: ['activities', id],
        queryFn: async () => {
            return agent.get<Activity>(`/activities/${id}`).then(response => response.data)
        },
        enabled: !!id
    })

    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.put(`/activities`, activity)
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ['activities']
            })
        }
    })


    const createActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            const response = await agent.post(`/activities`, activity)
            return response.data
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ['activities']
            })
        }
    })


    const deleteActivity = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete(`/activities/${id}`)
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ['activities']
            })
        }
    })

    return { activities, isPending, updateActivity, createActivity, deleteActivity, activity, isLoadingActivity }
}