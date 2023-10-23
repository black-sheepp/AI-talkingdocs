import "./App.css";
import ChatBot from "./components/ChatBot";
import DocUpload from "./components/DocUpload";
import Nav from "./components/Nav";
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect, useState } from "react";
import PDFLoader from "./components/bits_comp/PDFLoader";
import axios from "axios";

function App() {
	const [form, setForm] = useState({}); // User form data
	const [logout, setLogout] = useState(true); // User logout status
	const [pdfFile, setPdfFile] = useState(); // Selected PDF file for upload
	const [isLoading, setIsLoading] = useState(false); // Loading status
	const [upload, setUpload] = useState(false); // Upload status

	// Handle changes in the user form
	const handleForm = (e: any) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	// Handle form submission for user sign-up
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

	// Handle form submission for user sign-in
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

	// Handle user logout
	const handlelogout = async () => {
		await fetch("http://localhost:8080/logout", {
			method: "GET",
		});
		await localStorage.setItem("user", "");
		setLogout(true);
	};

	// Use useEffect to load user data from local storage when the component mounts
	useEffect(() => {
		const user = localStorage.getItem("user");
		if (user) {
			setForm(JSON.parse(user));
			setLogout(false);
		}
	}, []);

	// Function to extract the username from user data in local storage
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

	// Function to extract the authentication token from user data in local storage
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

	// Function to extract the user ID from user data in local storage
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

	// Handle the selection of a PDF file for upload
	const handleFileUpload = (event: any) => {
		console.log(event.target.files);
		setPdfFile(event.target.files[0]);
	};

	// Handle the PDF file upload
	const handlepdf = async (event: any) => {
		event.preventDefault();
		setIsLoading(true);

		// Create a FormData object and append the selected PDF file
		const formData = new FormData();
		formData.append("pdf_location", pdfFile);

		try {
			// Make a POST request to upload the PDF file
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

	// Reset the upload status
	const resetUpload = () => {
		setUpload(false);
	};
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
					{!logout ? ( // If the user is not logged out
						isLoading ? ( // If data is loading, show a PDFLoader component
							<PDFLoader />
						) : upload ? ( // show a ChatBot component with a resetUpload function
							<ChatBot resetUpload={resetUpload} />
						) : (
							// show a DocUpload component with handlePdf and handleFileUpload functions
							<DocUpload handlePdf={handlepdf} handleFileUpload={handleFileUpload} />
						)
					) : (
						// If the user is logged out, display the following content
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
