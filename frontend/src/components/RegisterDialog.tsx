import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import React from "react"

interface dialogProps {
    title: string,
    description: React.ReactNode,
    children: React.ReactNode,
    isDialogOpen: boolean,
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DialogBox({ title, description, children, isDialogOpen, setIsDialogOpen }: dialogProps) {
    return (
        <Dialog open={isDialogOpen} onOpenChange={(open)=>{
            if(!open) return
            setIsDialogOpen(open)
        }} >
            <DialogContent className="sm:max-w-3xl [&>button]:hidden">
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl text-center">{title}</DialogTitle>
                    <DialogDescription className="text-center">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}