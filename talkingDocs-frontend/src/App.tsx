import "./App.css";
import ChatBot from "./components/ChatBot";
import DocUpload from "./components/DocUpload";
import Nav from "./components/Nav";
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect, useState } from "react";
import PDFLoader from "./components/bits_comp/PDFLoader";
import TextLoader from "./components/bits_comp/TextLoader";
import axios from "axios";

function App() {
	const [form, setForm] = useState({});
	const [logout, setLogout] = useState(true);
	const [pdfFile, setPdfFile] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [upload, setUpload] = useState(false);

	useEffect(() => {
		const user = localStorage.getItem("user");
		if (user) {
			setForm(JSON.parse(user));
			setLogout(false);
		}
	}, []);

	const handleForm = (e: any) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const response = await fetch("http://localhost:8080/sign-up", {
			method: "POST",
			body: JSON.stringify(form),
			headers: { "Content-Type": "application/json" },
		});
		const data = await response.json();
		setForm(data);
		setLogout(false);
		localStorage.setItem("user", JSON.stringify(data));
	};

	const handlelogout = async () => {
		await fetch("http://localhost:8080/logout", {
			method: "GET",
		});
		await localStorage.setItem("user", "");
		setLogout(true);
	};

	const handleSignIn = async (e: any) => {
		e.preventDefault();
		const response = await fetch("http://localhost:8080/sign-in", {
			method: "POST",
			body: JSON.stringify(form),
			headers: { "Content-Type": "application/json" },
		});
		const data = await response.json();
		// console.log(data);
		setForm(data);
		setLogout(false);
		localStorage.setItem("user", JSON.stringify(data));
	};

	function username(): string | null {
		function getNameValueFromJSON(jsonString: any): any | null {
			try {
				const data = JSON.parse(jsonString);
				if (data && typeof data.name === "string") {
					return data.name;
				} else {
					return null;
				}
			} catch (error) {
				return null;
			}
		}

		const jsonString = localStorage.getItem("user");
		const nameValue = getNameValueFromJSON(jsonString);
		return nameValue;
	}

	function fetchToken(): string | null {
		const jsonString = localStorage.getItem("user");
		function getNameValueFromJSON(jsonString: any): any | null {
			try {
				const data = JSON.parse(jsonString);
				if (data && typeof data.token === "string") {
					return data.token;
				} else {
					return null;
				}
			} catch (error) {
				return null;
			}
		}
		const tokenValue = getNameValueFromJSON(jsonString);
		return tokenValue;
	}

	function getUserId(): string | null {
		const jsonString = localStorage.getItem("user");
		function getNameValueFromJSON(jsonString: any): any | null {
			try {
				const data = JSON.parse(jsonString);
				if (data && typeof data._id === "string") {
					return data._id;
				} else {
					return null;
				}
			} catch (error) {
				return null;
			}
		}
		const _id = getNameValueFromJSON(jsonString);
		return _id;
	}

	const handleFileUpload = (event: any) => {
		console.log(event.target.files);
		setPdfFile(event.target.files[0]);
	};

	const handlepdf = async (event: any) => {
		event.preventDefault();
		setIsLoading(true);
		const formData = new FormData();
		formData.append("pdf_location", pdfFile);

		try {
			const response = await axios.post(`http://localhost:8080/pdf-upload/${getUserId()}`, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			console.log(response);
			if (response.status === 200) {
				setIsLoading(false);
				setUpload(true);
			}
		} catch (error) {
			console.error("Error during file upload:", error);
		}
	};

	const resetUpload = () => {
		setUpload(false);
	}
	return (
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<div className='h-screen'>
				<Nav
					handleForm={handleForm}
					handleSubmit={handleSubmit}
					username={username()}
					handlelogout={handlelogout}
					handleSignIn={handleSignIn}
					fetchToken={fetchToken()}
					logoutStatus={logout}
				/>
				<div className='flex flex-col justify-center px-8 mt-10 lg:px-20'>
					{!logout ? (
						isLoading ? (
							<PDFLoader />
						) : upload ? (
							<ChatBot resetUpload={resetUpload} />
						) : (
							<DocUpload handlePdf={handlepdf} handleFileUpload={handleFileUpload} />
						)
					) : (
						<>
							<p className='text-center text-2xl lg:text-2xl mt-24'>
								Sign Up / Sign In with{" "}
								<strong className='text-[#01EBFC] text-5xl'>TalkingDocs</strong>.
							</p>
							<p className='text-center text-3xl lg:text-4xl font-semibold mt-24'>
								Step into the future of document interaction with{" "}
								<strong className='text-[#01EBFC]'>TalkingDocs</strong>.
							</p>
							<p className='text-center my-8 text-lg lg:text-xl font-light text-[#01EBFC]'>
								Experience the thrill as your documents come alive, engaging in a dynamic
								conversation. Reading is now a blast! 😎
							</p>
						</>
					)}
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App;
