import { Dispatch, FC, SetStateAction, useState } from 'react'

import { Avatar, ComponentVisible, IconOutline, useHideClickOutside } from '../../lib'
import { UserProfile } from '../user-profile.model'

import { ProfilePanel } from './profile-panel'
import styles from './ProfileLoggedIn.module.scss'

interface ProfileLoggedInProps {
    profile: UserProfile
    workPath: string
}

const ProfileLoggedIn: FC<ProfileLoggedInProps> = (props: ProfileLoggedInProps) => {

    const [profilePanelOpen, setProfilePanelOpen]: [boolean, Dispatch<SetStateAction<boolean>>]
        = useState<boolean>(false)

    const {
        isComponentVisible,
        ref,
        setIsComponentVisible,
    }: ComponentVisible = useHideClickOutside(false)

    const { profile }: ProfileLoggedInProps = props

    if (!profile) {
        return <></>
    }

    function toggleProfilePanel(): void {
        const toggleTo: boolean = !profilePanelOpen
        setProfilePanelOpen(toggleTo)
        setIsComponentVisible(toggleTo)
    }

    if (!isComponentVisible && profilePanelOpen) {
        setProfilePanelOpen(isComponentVisible)
    }

    return (
        <>
            <div
                className={styles['profile-avatar']}
                onClick={toggleProfilePanel}
            >
                <Avatar
                    firstName={profile.firstName}
                    lastName={profile.lastName}
                    handle={profile.handle}
                    photoUrl={profile.photoURL}
                    size='sm'
                />
                {profilePanelOpen && (
                    <div className={styles.overlay}>
                        <IconOutline.XIcon />
                    </div>
                )}
            </div>
            {profilePanelOpen && (
                <ProfilePanel
                    profile={profile}
                    refObject={ref}
                    toggleProfilePanel={toggleProfilePanel}
                    workPath={props.workPath}
                />
            )}
        </>
    )
}

export default ProfileLoggedIn
