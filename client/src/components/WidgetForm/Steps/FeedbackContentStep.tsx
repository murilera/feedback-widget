import { ArrowLeft } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { FeedbackType, feedbackTypes } from '..'
import { api } from '../../../lib/api'
import { CloseButton } from '../../CloseButton'
import { Loading } from '../Loading'
import { ScreenshotButton } from '../ScreenshotButton'

interface FeedbackContentStepProps {
  feedbackType: FeedbackType
  onFeedbackRestartRequested: () => void
  onFeedbackSent: () => void
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState(null)
  const [comment, setComment] = useState('')
  const [isSendingFeedback, setIsSedingFeedback] = useState(false)

  const feedbackTypeInfo = feedbackTypes[feedbackType]

  const handleSubmitFeedback = async (event: FormEvent) => {
    event.preventDefault()
    setIsSedingFeedback(true)

    await api.post('/feedbacks', {
      type: feedbackType,
      comment,
      screenshot
    })

    setIsSedingFeedback(false)
    onFeedbackSent()
  }

  return (
    <>
      <header>
        <button
          type='button'
          className='top-5 left-5 absolute text-zinc-400 hover:text-zinc-100'
          onClick={() => onFeedbackRestartRequested()}
        >
          <ArrowLeft weight='bold' className='w-4 h-4' />
        </button>
        <span className='text-xl leading-6 flex items-center gap-2'>
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className='w-6 h-6'
          />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form
        onSubmit={(event) => handleSubmitFeedback(event)}
        className='my-4 w-full'
      >
        <textarea
          className='min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-100 text-zinc-100 border-zinc-200 bg-transparent rounded-md focus:border-brown-200 focus:ring-brown-200 focus:ring-2 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin'
          placeholder='Conte nos o que está acontecendo...'
          onChange={(event) => setComment(event.target.value)}
        ></textarea>

        <footer className='flex gap-2 mt-2'>
          <ScreenshotButton
            onScreenshotTook={setScreenshot}
            screenshot={screenshot}
          />

          <button
            type='submit'
            disabled={comment.length === 0 ? true : false || isSendingFeedback}
            className='p-2 bg-brown-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brown-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brown-500 transition-colors disabled:opacity-50 disabled:hover:bg-brown-500'
          >
            {isSendingFeedback ? <Loading></Loading> : 'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}
