import React from 'react';

//TODO make fullscreen iframe with user defined source
export default function ScreenCover(props: any) {
  return <div className="screen-cover">
    <h1>Nothing to see here</h1>
    <p>To start the fake kali login press the following key combination: <code>Ctrl+Space</code>.
    This will open up the fake login screen in fullscreen mode.
To go back here / exit the simulation just press the <code>Escape</code> key.
                                    If you have finished the simulation and want to start it again
 just reload the page (you can press <code>F5</code> to do that) and press <code>Ctrl+Space</code> again.</p>
  </div>
}
