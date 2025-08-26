import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardAction
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const messages = [
  // {
  //   id: 1,
  //   sender: 'mscott',
  //   subject: 'Project Invite',
  //   snippet: 'You have been invited to ',
  //   project: 'Electric Distribution',
  //   date: '2024-10-01'
  // },
  // {
  //   id: 2,
  //   sender: 'dwight',
  //   subject: 'Project Invite',
  //   snippet: 'You have been invited to ',
  //   project: 'Solar PV Design',
  //   date: '2024-10-02'
  // },
]

const Messages = () => {
  return (
    <div className='flex flex-col justify-center w-full max-w-2xl mx-auto p-4 space-y-4'>
      <Card className='p-6'>
        <div className="grid gap-3">
          <h1 className="text-2xl font-semibold text-balance">Messages</h1>
          <p className="text-muted-foreground text-sm">View your messages below.</p>
        </div>
        {/* <Separator /> */}
        {messages.map((message, index) => (
          <>
            <div className='flex justify-between'>
              <div>
                <CardTitle>{ message.subject }</CardTitle>
                <CardDescription>From: { message.sender }</CardDescription>
              </div>
                <CardDescription className='flex justify-between items-center'>
                  <div>
                    <span className='pr-2'>{ message.snippet }</span>
                    <Button variant='outline'>{ message.project }</Button>
                  </div>
                </CardDescription>
                <Button variant='destructive'>X</Button>
            </div>
            {index < messages.length - 1 && <Separator />}
          </>
        ))}
      </Card>
    </div>
  )
}

export default Messages