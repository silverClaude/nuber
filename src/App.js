import './App.css';
import * as React from 'react';
import { Amplify, Storage } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import { ThemeProvider } from '@aws-amplify/ui-react';
// import { Text, useTheme, View, Image, Heading, Button, useAuthenticator, Radio, RadioGroupField, CheckboxField } from '@aws-amplify/ui-react';
import { useAuthenticator, Radio, RadioGroupField, CheckboxField } from '@aws-amplify/ui-react';
import PrimarySearchAppBar from '../src/Menu';



Amplify.configure(awsExports);


const formFields = {
  signIn: {
    username: {
      labelHidden: false,
      placeholder: 'Enter your email',
    },
  },
  signUp: {
    email: {
      labelHidden: false,
      label: 'Email:',
      placeholder: 'Email',
      isRequired: false,
      order: 1,
    },
    name: {
      labelHidden: false,
      label: 'Name:',
      placeholder: 'Name',
      isRequired: false,
      order: 2,
    },
    password: {
      labelHidden: false,
      label: 'Password:',
      placeholder: 'Enter your Password',
      isRequired: false,
      order: 4,
    },
    confirm_password: {
      labelHidden: false,
      label: 'Confirm Password:',
      order: 5,
    },
  },
  forceNewPassword: {
    password: {
      labelHidden: false,
      placeholder: 'Enter your Password:',
    },
  },
  resetPassword: {
    username: {
      labelHidden: false,
      placeholder: 'Enter your email:',
    },
  },
  confirmResetPassword: {
    confirmation_code: {
      labelHidden: false,
      placeholder: 'Enter your Confirmation Code:',
      label: 'New Label',
      isRequired: false,
    },
    confirm_password: {
      labelHidden: false,
      placeholder: 'Enter your Password Please:',
    },
  },
  setupTOTP: {
    QR: {
      totpIssuer: 'test issuer',
      totpUsername: 'amplify_qr_test_user',
    },
    confirmation_code: {
      labelHidden: false,
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
  confirmSignIn: {
    confirmation_code: {
      labelHidden: false,
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
};


export default function App() {
  // let role = '';
  // const [value, setValue] = React.useState('Customer');
  const value = React.useRef("Customer");
  const uploadRef = React.useRef();

  return (
    <ThemeProvider>
      <Authenticator formFields={formFields} components={{
        SignUp: {
          FormFields() {
            const { validationErrors } = useAuthenticator();



            return (

              <>
                {/* Re-use default `Authenticator.SignUp.FormFields` */}

                <Authenticator.SignUp.FormFields />

                {/* Append & require Terms & Conditions field to sign up  */}

                <RadioGroupField
                  className='r'
                  label="Role:"
                  name="Role"
                  defaultValue="Driver"
                  value={value.current}
                  // onChange={(e) => setValue(e.target.value)} 
                  onChange={(e) => {
                    // setValue(e.target.value);
                    value.current = e.target.value;
                    // role = value;
                    // console.log("testRole"+ role);
                  }}
                >
                  <Radio value="Customer">Customer</Radio>
                  <Radio value="Driver">Driver</Radio>
                </RadioGroupField>
                <CheckboxField
                  errorMessage={validationErrors.acknowledgement}
                  hasError={!!validationErrors.acknowledgement}
                  name="acknowledgement"
                  value="yes"
                  label="I agree with the Terms & Conditions"
                />
              </>
            );
          },
        },
      }}>
        {({ signOut, user }) => {
          // console.log("testRole: "+ role);
          if (value.current === 'Customer') {
            return (
              <main>
                <PrimarySearchAppBar></PrimarySearchAppBar>
                <h1 className='hello'>Hello, {user.attributes.name}</h1>
                <h2 className='activity'>You have no upcoming trips.</h2>
                <div className='signOut' onClick={signOut}>Sign out</div>

              </main>
            )

          } else {
            return (
              <main>
                <PrimarySearchAppBar></PrimarySearchAppBar>
                <h1 className='hello'>Hello, {user.attributes.name}</h1>
                
                {/* <input
                  type="file"
                  onChange={async e => {
                    const file = e.target.files[0];
                    const result = await Storage.put(file.name, file);
                    console.log(result);
                    console.log(e.target.files);
                  }}
                  onClick={e => console.log(e)}
                /> */}
                <h2 className='activity'>You have no upcoming trips.</h2>
                <div className="upload" onClick={() => {
                  uploadRef.current.click();
                }}>
                  
                  <div className="icon">Click here-upload your diver license</div>
                  <input ref={uploadRef} className="uploadInput" type='file' onChange={async e => {
                    const file = e.target.files[0];
                    const result = await Storage.put(file.name, file);
                    alert("Successfully uploaded.");
                    console.log(result);
                    console.log(e.target.files);
                  }} />
                </div>
                <div height = '30px'></div>
                <div className='signOut' onClick={signOut}>Sign out</div>
              </main>
            )
          }
        }}
      </Authenticator></ThemeProvider>
  );
}





