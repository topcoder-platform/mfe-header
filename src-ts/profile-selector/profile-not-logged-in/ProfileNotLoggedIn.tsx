import { FC } from 'react'

import config from '../../../config'
import { Button } from '../../lib'

import styles from './ProfileNotLoggedIn.module.scss'

const ProfileNotLoggedIn: FC<{}> = () => {

    const login: string = `${config.URL.ACCOUNTS_APP_CONNECTOR}?retUrl=${encodeURIComponent(window.location.href.match(/[^?]*/)?.[0] || fallback)}`
    const signup: string = `${login}&regSource=tcBusiness&mode=signUp`

    return (
        <>
            <Button
                buttonStyle='text'
                className={styles.login}
                label='Log In'
                size='sm'
                tabIndex={-1}
                url={login}
            />
            <Button
                buttonStyle='tertiary'
                className={styles.signup}
                label='Sign Up'
                size='sm'
                tabIndex={-1}
                url={signup}
            />
        </>
    )
}

export default ProfileNotLoggedIn
