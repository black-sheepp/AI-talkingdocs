import React from "react";
import { LogOut, User, GalleryVerticalEnd } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropdownMenuDemoProps {
	username: string | null;
	handlelogout: () => void;
}

export function DropdownMenuDemo({ username, handlelogout }: DropdownMenuDemoProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>{username || "Guest"}</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<User className='mr-2 h-4 w-4' />
						<span>LinkedIn</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<GalleryVerticalEnd className='mr-2 h-4 w-4' />
						<span>GitHub</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handlelogout}>
					<LogOut className='mr-2 h-4 w-4' />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
