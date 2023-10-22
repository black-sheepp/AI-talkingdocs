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

export function SignIn({handleSignIn,handleForm}:{handleSignIn: any, handleForm: any}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Sign In</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[600px]'>
				<DialogHeader>
					<DialogTitle>Sign In</DialogTitle>
					<DialogDescription>
						Please login to TalkingDocs
					</DialogDescription>
				</DialogHeader>
				<form action="" onSubmit={handleSignIn}>
				<div className='grid gap-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='name' className='text-right'>
							Email
						</Label>
						<Input id='name' placeholder='shivamgupta@hivemind.com' className='col-span-3' name="email" onChange={handleForm}/>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='username' className='text-right'>
							Password
						</Label>
						<Input id='username' type="password" placeholder='*********' className='col-span-3' name="password" onChange={handleForm}/>
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
