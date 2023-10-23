import Styles from "./bits_comp/UploadFile.module.css";

// Defining a functional React component for DocUpload, taking props handlePdf and handleFileUpload
const DocUpload = ({ handlePdf, handleFileUpload }: { handlePdf: any, handleFileUpload: any }) => {
	return (
		<div className='flex flex-col'>
			<p className='text-center mt-20 text-3xl lg:text-4xl font-semibold text-[#01EBFC]'>
				Forget reading, it's all about having a chat now!
			</p>
			<p className='text-center my-8 text-lg lg:text-xl font-light'>
				Introducing <strong>TalkingDocs</strong>, where documents talk back to you. Reading is no longer
				dull. it's a blast!" 😎
			</p>
			<div className='flex my-6 justify-center p-5'>
				      {/* File Upload Form */}
				<form onSubmit={handlePdf}>
					<div className={Styles.input_div} id='file'>
						<input className={Styles.input} name='PDF' type='file' accept="application/pdf" onChange={handleFileUpload}/>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='2em'
							height='2em'
							strokeLinejoin='round'
							strokeLinecap='round'
							viewBox='0 0 24 24'
							strokeWidth={2}
							fill='none'
							stroke='currentColor'
							className={Styles.icon}>
							<polyline points='16 16 12 12 8 16' />
							<line y2={21} x2={12} y1={12} x1={12} />
							<path d='M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3' />
							<polyline points='16 16 12 12 8 16' />
						</svg>
					</div>
					<input type="submit" value="Upload PDF" className='text-center mt-16 text-3xl font-semibold text-[#01EBFC] cursor-pointer' />
				</form>
			</div>
		</div>
	);
};

export default DocUpload;
