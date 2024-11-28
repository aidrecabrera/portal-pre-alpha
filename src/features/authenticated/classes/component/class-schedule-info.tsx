import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Separator } from '@/components/ui/separator'
import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'
import { Book, Clock, User, Users } from 'lucide-react'
import * as React from 'react'

interface ScheduleDialogProps {
  courseCode: string
  courseTitle: string
  timeSlot: string
  room: string
  professor: string
  units: number
  section: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function ScheduleDialog({
  courseCode,
  courseTitle,
  timeSlot,
  room,
  professor,
  units,
  section,
  open,
  setOpen,
}: ScheduleDialogProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const content = (
    <>
      <div>
        <h1 className="text-2xl font-bold text-center text-primary">
          {courseCode}
        </h1>
        <DrawerTitle className="text-center text-md">{courseTitle}</DrawerTitle>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-row gap-2">
          <Badge variant="outline">{timeSlot}</Badge>
          <Badge variant="outline">{room}</Badge>
        </div>
      </div>
      <ScheduleInformation
        professor={professor}
        courseCode={courseCode}
        units={units}
        section={section}
      />
    </>
  )

  if (isDesktop) {
    return (
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>{content}</DialogHeader>
          <DialogClose asChild>
            <Button className="w-full" variant="destructive">
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open}>
      <DrawerContent className="mx-20">
        <DrawerHeader>{content}</DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button className="mx-4 -mt-6" variant="destructive">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

interface ScheduleInformationProps {
  professor: string
  courseCode: string
  units: number
  section: string
}

function ScheduleInformation({
  className,
  professor,
  courseCode,
  units,
  section,
}: ScheduleInformationProps & React.ComponentProps<'div'>) {
  return (
    <div className={cn('overflow-hidden', className)}>
      <div>
        <Separator />
        <div className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-2">
          <InfoItem
            icon={<User className="w-5 h-5" />}
            label="Professor"
            value={professor}
          />
          <InfoItem
            icon={<Book className="w-5 h-5" />}
            label="Class ID"
            value={courseCode}
          />
          <InfoItem
            icon={<Clock className="w-5 h-5" />}
            label="Units"
            value={<Badge variant="secondary">{units} Units</Badge>}
          />
          <InfoItem
            icon={<Users className="w-5 h-5" />}
            label="Section"
            value={<Badge variant="outline">{section}</Badge>}
          />
        </div>
        <Separator />
      </div>
    </div>
  )
}

interface InfoItemProps {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-center justify-center space-x-3">
      <div className="flex-shrink-0 text-muted-foreground">{icon}</div>
      <div>
        <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
        <dd className="mt-1 text-sm font-semibold">{value}</dd>
      </div>
    </div>
  )
}
