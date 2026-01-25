import { useMutation, useQuerry } from "@tanstack/react-query";
import toast from "react-hoy-toast";
import { sessionApi } from "../api/sessions";

export const useCreateSession = () => {
    const result = useMutation({
        mutationKey : ["createSession"],
        mutationFn: sessionApi.createSession,
        onSuccess: () => toast.success("Session created successfully!"),
        onError: () => toast.error(error.response?.data?.message || "Failed to create session.")
    });

    return result;
};

export const useActiveSession = () =>{
    const result = useQuerry({
        queryKey : ["aciveSessions"],
        queryFn : sessionApi.getActiveSessions,
    });

    return result;
}

export const useMyRecentSessions = () =>{
    const result = useQuerry({
        queryKey : ["myRecentSessions"],
        queryFn : sessionApi.getMyRecentSessions,
    });

    return result;
};

export const useSessionById = (id) =>{
    const result = useQuerry({
        queryKey : ["myRecentSessions",id],
        queryFn : sessionApi.getSessionById(id),
        enabled: !!id,
        refetchInterval: 5000,  //name itself defines
    });

    return result;
}

export const useJoinSession = () => {
  const result = useMutation({
    mutationKey: ["joinSession"],
    mutationFn: sessionApi.joinSession,
    onSuccess: () => toast.success("Joined session successfully!"),
    onError: (error) => toast.error(error.response?.data?.message || "Failed to join session"),
  });

  return result;
};

export const useEndSession = () => {
  const result = useMutation({
    mutationKey: ["endSession"],
    mutationFn: sessionApi.endSession,
    onSuccess: () => toast.success("Session ended successfully!"),
    onError: (error) => toast.error(error.response?.data?.message || "Failed to end session"),
  });

  return result;
};