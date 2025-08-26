import { useRef, useState } from 'react'

import { createFeedback } from '../../../services/feedback'

// import Card from '../../components/library/card/component'
// import Button from '../../components/library/button/component'
// import Textarea from '../../components/library/textarea/component'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardAction
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import styles from './styles.module.css'

const Feedback = () => {
  const descriptionRef = useRef();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const user = JSON.parse(localStorage.getItem('user'));
    const user_id = user?.id

    const feedback = {
      description: descriptionRef.current.value.trim(),
      user: user_id,
      date: new Date(),
    }

    if (!feedback) setError('Please enter your feedback.')

    try {
      await createFeedback(feedback);
      setMessage('Thank you for your feedback!');
      descriptionRef.current.value = '';
    } catch (err) {
      setError('Failed to submit feedback. Please try again later.', err);
    }
  };

  return (
    <div className={ styles.container }>
      <Card className='w-full max-w-sm dark:bg-neutral-950'>
        <CardHeader>
          <CardTitle>Feedback</CardTitle>
          <CardDescription>We value your feedback!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={ handleSubmit }>
            <div className='grid gap-3'>
              <Textarea
                className='dark:bg-neutral-950'
                id='feedback'
                name='feedback'
                type='text'
                placeholder='Type your message to the team here.'
                ref={ descriptionRef }
                required
              />
              <Button type='submit' className='grid gap-3 w-full'>Submit feedback</Button>
            </div>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Feedback;