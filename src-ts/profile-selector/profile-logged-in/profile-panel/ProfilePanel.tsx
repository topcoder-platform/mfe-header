import { Link } from '@reach/router'
import { FC, MutableRefObject } from 'react'

import config from '../../../../config'
import { UserProfile } from '../../user-profile.model'

import styles from './ProfilePanel.module.scss'

interface ProfilePanelProps {
    profile: UserProfile
    refObject: MutableRefObject<any>
    toggleProfilePanel: () => void
    workPath: string
}

const ProfilePanel: FC<ProfilePanelProps> = (props: ProfilePanelProps) => {

    const { profile }: ProfilePanelProps = props

    if (!profile) {
        // this should never happen
        return <></>
    }

    const authUrlLogout: string = `${config.URL.ACCOUNTS_APP_CONNECTOR}?logout=true&retUrl=${encodeURIComponent(`https://${window.location.host}${props.workPath}`)}`

    return (
        <div
            className={styles['profile-panel']}
            ref={props.refObject}
        >
            <div className={styles.handle}>
                {profile.handle}
            </div>
            <Link
                className={styles.profile}
                onClick={() => props.toggleProfilePanel()}
                to={`${props.workPath}/account`}
            >
                Account
            </Link>
            <a href={authUrlLogout} className={styles.logout}>
                Log Out
            </a>
        </div>
    )
}

export default ProfilePanel
