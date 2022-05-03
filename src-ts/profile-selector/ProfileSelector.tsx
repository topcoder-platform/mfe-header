import { FC } from 'react'

import { ProfileLoggedIn } from './profile-logged-in'
import { ProfileNotLoggedIn } from './profile-not-logged-in'
import styles from './ProfileSelector.module.scss'
import { UserProfile } from './user-profile.model'

interface ProfileSelectorProps {
    initialized: boolean
    profile: UserProfile
    workPath: string
}

const ProfileSelector: FC<ProfileSelectorProps> = (props: ProfileSelectorProps) => {

    const { initialized, profile }: ProfileSelectorProps = props

    // if we're not initialized, don't render anything
    if (!initialized) {
        return <></>
    }

    const isLoggedIn: boolean = !!profile
    return (
        <div className={styles['profile-selector']}>
            {!isLoggedIn && <ProfileNotLoggedIn />}
            {isLoggedIn && (
                <ProfileLoggedIn
                    profile={profile}
                    workPath={props.workPath}
                />
            )}
        </div>
    )
}

export default ProfileSelector
