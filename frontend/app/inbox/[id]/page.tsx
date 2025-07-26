import { getUserId } from "../../lib/actions";
import React from 'react';
import apiService from "@/app/services/apiService";
import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import { UserType } from "../page";
import { getAccessToken } from "../../lib/actions";

export type MessageType = {
    id: string;
    name: string;
    body: string;
    conversationId: string;
    sent_to: UserType;
    created_by: UserType
}

interface ConversationPageProps {
    params: Promise<{ id: string }>
}

const ConversationPage: React.FC<ConversationPageProps> = async ({ params }) => {
    const { id } = await params;
    const userId = await getUserId();
    const token = await getAccessToken();

    if (!userId || !token) {
        return (
            <main className="w-full flex max-w-[1500px] max-auto justify-center    px-6 py-12">
                <p>인증 권한이 필요합니다.</p>
            </main>
        )
    }

    const conversation = await apiService.get(`/api/chat/${id}/`)

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <ConversationDetail 
                token={token}
                userId={userId}
                messages={conversation.messages}
                conversation={conversation.conversation}
            />
        </main>
    )
}

export default ConversationPage;