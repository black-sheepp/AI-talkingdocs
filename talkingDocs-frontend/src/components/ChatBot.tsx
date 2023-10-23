import React, { useEffect, useState } from "react";
import Styles from "./ChatBot.module.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader, Send, UploadCloud } from "lucide-react";
import TextLoader from "./bits_comp/TextLoader";
import axios from "axios";

const ChatBot = ({ resetUpload }: { resetUpload: any }) => {
	const [chatLLM, setChatLLM] = useState<string[]>([]); // Stores chat messages
	const [query, setQuery] = useState<string>(""); // Stores user question input
	const [chatQuery, setChatQuery] = useState<string[]>([]); // Stores user queries

	// Function to handle user input changes
	const handleInputQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	// Function to handle user queries
	const handleQuery = async (e: React.FormEvent) => {
		e.preventDefault();
		setChatQuery([...chatQuery, query]);
		setQuery(""); // Clear the input field
		const response = await axios.post(`http://localhost:8080/query`, { query });
		if (response.status === 200) {
			const data = response.data;
			// Update chatLLM with the acknowledgment text from the server
			setChatLLM((prevChatLLM) => [...prevChatLLM, data.acknowledgement.text]);
			// return data.acknowledgement.text;
		} else {
			console.error("Failed to retrieve data from the server");
		}
	};

	// Effect to log when chatLLM state changes
	useEffect(() => {
		console.log("chatLLM changed:", chatLLM);
	}, [chatLLM]);

	return (
		<div className={Styles.messagingApp}>
			<p className='text-center p-2 mt-0 text-3xl lg:text-3xl font-semibold fixed top-20 left-0 right-0 z-10 bg-white dark:bg-[#020817]'>
				Ask your <strong className='text-[#01EBFC]'>TalkingDocs</strong>.
			</p>

			<div className={Styles.messageWrapper}>
				<div className={Styles.blur} />
				{chatQuery.map((userQuery, index) => (
					<div key={index} id='messages' className={Styles.messages}>
						<div className={`${Styles.chat} ${Styles.me}`}>{userQuery}</div>
						{chatLLM[index] ? <div className={Styles.chat}>{chatLLM[index]}</div> : <TextLoader />}
					</div>
				))}
			</div>

			{/* Form for user input */}
			<form action='' onSubmit={handleQuery}>
				<div className='flex w-full items-center space-x-2'>
					{/* Input field for user's query */}
					<Input
						type='text'
						placeholder='Ask TalkingDocs'
						name='query'
						value={query}
						onChange={handleInputQuery}
					/>
					<Button type='submit'>
						<Send />
						&nbsp;&nbsp;Send
					</Button>
				</div>
			</form>

			{/* Form to reset and upload another PDF */}
			<form action='' onSubmit={resetUpload}>
				<Button type='submit' className='mt-8'>
					<UploadCloud />
					&nbsp;&nbsp;Upload Another PDF
				</Button>
			</form>
		</div>
	);
};

export default ChatBot;
