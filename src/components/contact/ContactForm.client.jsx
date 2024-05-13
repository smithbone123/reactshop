import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from '@shopify/hydrogen/client';
import {
  emailValidation,
  subjectValidation,
  messageValidation,
} from '~/lib/utils';
import {getInputStyleClasses} from '../../lib/styleUtils';

export function ContactForm() {
  // nodemailer
  const sendMail = () => {
    axios
      .get('http://localhost:4000/', {
        params: {
          email,
          subject,
          message,
        },
      })
      .then(() => {
        //success
        console.log('success');
      })
      .catch(() => {
        console.log('failure');
      });
  };

  // form validation
  const navigate = useNavigate();

  const [submitError, setSubmitError] = useState(null);
  // email
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  // subject
  const [subject, setSubject] = useState('');
  const [subjectError, setSubjectError] = useState(null);
  // message
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState(null);

  async function onSubmit(event) {
    event.preventDefault();

    setEmailError(null);
    setSubjectError(null);
    setMessageError(null);
    setSubmitError(null);

    // email
    const newEmailError = emailValidation(event.currentTarget.email);
    if (newEmailError) {
      setEmailError(newEmailError);
    }

    // subject
    const newSubjectError = subjectValidation(event.currentTarget.subject);
    if (newSubjectError) {
      setSubjectError(newSubjectError);
    }

    // message
    const newMessageError = messageValidation(event.currentTarget.message);
    if (newMessageError) {
      setMessageError(newMessageError);
    }

    if (newEmailError || newSubjectError) {
      return;
    }

    navigate('/contact/success');
  }

  return (
    <div className="flex justify-center my-24 px-4">
      <div className="max-w-md w-full">
        <h1 className="text-4xl">Contact Form.</h1>
        <form noValidate className="pt-6 pb-8 mt-4 mb-4" onSubmit={onSubmit}>
          {submitError && (
            <div className="flex items-center justify-center mb-6 bg-zinc-500">
              <p className="m-4 text-s text-contrast">{submitError}</p>
            </div>
          )}
          {/* email */}
          <div className="mb-3">
            <input
              className={`bg-white-800 py-4 px-6 w-full rounded-none border border-slate-200 mb-1 ${getInputStyleClasses(
                emailError,
              )}`}
              id="email"
              name="email"
              type="email"
              autoComplete="off"
              required
              placeholder="Email address"
              aria-label="Email address"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            {!emailError ? (
              ''
            ) : (
              <p className={`text-red-500 text-xs`}>{emailError} &nbsp;</p>
            )}
          </div>
          {/* subject */}
          <div className="mb-3">
            <input
              className={`bg-white-800 py-4 px-6 w-full rounded-none border border-slate-200 mb-1 ${getInputStyleClasses(
                subjectError,
              )}`}
              id="subject"
              name="subject"
              type="text"
              autoComplete="off"
              placeholder="Subject"
              aria-label="Subject"
              value={subject}
              minLength={8}
              required
              onChange={(event) => {
                setSubject(event.target.value);
              }}
            />
            {!subjectError ? (
              ''
            ) : (
              <p className={`text-red-500 text-xs`}>{subjectError} &nbsp;</p>
            )}
          </div>
          {/* message */}
          <div className="mb-3">
            <textarea
              className={`bg-white-800 py-4 px-6 w-full rounded-none border border-slate-200 mb-1 ${getInputStyleClasses(
                messageError,
              )}`}
              id="message"
              name="message"
              placeholder="Message"
              // aria-label="Subject"
              value={message}
              required
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              rows="5"
            />
            {!messageError ? (
              ''
            ) : (
              <p className={`text-red-500 text-xs`}>{messageError} &nbsp;</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-primary text-contrast py-4 px-4 focus:shadow-outline block w-full"
              type="submit"
              onClick={sendMail}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
