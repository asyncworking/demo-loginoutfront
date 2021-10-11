import * as React from 'react';
import Avatar, { ConfigProvider } from 'react-avatar';

interface IUserProfileIcon {
  name: any
  size: string
  textSizeRatio: number
}

const UserProfileIcon = ({
  name,
  size,
  textSizeRatio,
}: IUserProfileIcon) => (
  <ConfigProvider>
    <Avatar maxInitials={3} name={name} round size={size} textSizeRatio={textSizeRatio} />
  </ConfigProvider>
);

export default UserProfileIcon;
