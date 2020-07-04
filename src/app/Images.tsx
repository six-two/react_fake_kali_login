import React from 'react';

import iconRebootDialog from '../img/dialogs/reboot-w.png';
import iconShutdownDialog from '../img/dialogs/shutdown-w.png';
//
import kaliContainer from '../img/plymouth/logo/container.png';
import kaliFade from '../img/plymouth/logo/fade.png';
import kaliLogo from '../img/plymouth/logo/logo.png';
import kaliOutline from '../img/plymouth/logo/outline.png';
//
import iconKey from '../img/plymouth/key.png';
import iconAccessibility from '../img/login/accessibility.png';
import iconBars from '../img/login/bars.png';
import iconShutdown from '../img/login/shutdown.png';
import iconUser from '../img/login/user.png';
//
import imageGrubBackground from '../img/grub.jpg';
import imageLoginBackground from '../img/login/background.jpg';


export { iconRebootDialog, iconShutdownDialog };
export { kaliFade, kaliLogo, kaliOutline, kaliContainer };
export { iconKey, iconAccessibility, iconBars, iconShutdown, iconUser };
export { imageGrubBackground, imageLoginBackground };

function isNotInlineImage(src: string) {
  return !src.startsWith("data:image");
}

const NOT_INLINED_IMAGES = [iconRebootDialog, iconShutdownDialog,
  kaliFade, kaliLogo, kaliOutline, kaliContainer,
  iconKey, iconAccessibility, iconBars, iconShutdown, iconUser,
  imageGrubBackground, imageLoginBackground].filter(isNotInlineImage);


function renderImage(src: string) {
  return <img key={src} src={src} alt="" />
}

export function PreloadImages() {
  return <div className="preload-images">
    {NOT_INLINED_IMAGES.map(renderImage)}
  </div>
}
