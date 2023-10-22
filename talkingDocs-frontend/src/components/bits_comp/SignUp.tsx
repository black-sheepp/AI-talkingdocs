import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignUp({handleSubmit,handleForm}:{handleSubmit: any, handleForm: any}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Sign Up</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[600px]'>
				<form action='' onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Sign Up</DialogTitle>
						<DialogDescription>Sign Up to TalkingDocs</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label htmlFor='email' className='text-right'>
								Email
							</Label>
							<Input
								id='email'
								placeholder='shivamgupta@hivemind.com'
								className='col-span-3'
								name='email'
								onChange={handleForm}
							/>
						</div>
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label htmlFor='name' className='text-right'>
								Name
							</Label>
							<Input
								id='name'
								placeholder='Shivam K Gupta'
								className='col-span-3'
								name='name'
								onChange={handleForm}
							/>
						</div>
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label htmlFor='password' className='text-right'>
								Password
							</Label>
							<Input
								id='password'
								type='password'
								placeholder='*******'
								className='col-span-3'
								name='password'
								onChange={handleForm}
							/>
						</div>
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label htmlFor='gitHub' className='text-right'>
								GitHub
							</Label>
							<Input
								id='gitHub'
								type='62341876'
								placeholder='*******'
								className='col-span-3'
								name='github'
								onChange={handleForm}
							/>
						</div>
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label htmlFor='linkedIn' className='text-right'>
								LinkedIn
							</Label>
							<Input
								id='linkedIn'
								type='62341876'
								placeholder='*******'
								className='col-span-3'
								name='linkedIn'
								onChange={handleForm}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type='submit'>Submit</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
