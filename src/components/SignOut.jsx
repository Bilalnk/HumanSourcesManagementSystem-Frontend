import React from 'react'
import Button from '@material-ui/core/Button';

function SignOut({SignIn}) {
        return (
                <div>
                        <Button color="inherit" onClick={SignIn}>Giriş Yap</Button>
                        <Button color="inherit">Kayıt Ol</Button>
                </div>
        )
}

export default SignOut
