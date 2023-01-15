const butInstall = document.getElementById('buttonInstall');

window.addEventListener('onload', (event) => {
    // Prevent the mini-infobar from appearing on mobile.
    event.preventDefault();
    console.log('👍', 'beforeinstallprompt', event);
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Remove the 'hidden' class from the install button container.
    butInstall.classList.toggle('hidden', false);
  });

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    butInstall.style.visibility = 'visible';
    
    // TODO: Implement a click event handler on the `butInstall` element
    butInstall.addEventListener('click', async (event) => {
        event.prompt();
        butInstall.setAttribute('disabled', true);
        butInstall.textContent = 'installed!';
        console.log('👍', 'butInstall-clicked');



        console.log(window.deferredPrompt);
        const promptEvent = window.deferredPrompt;
        console.log(promptEvent);
        
        if (!promptEvent) {
            // The deferred prompt isn't available.
            console.log("Prompt Event Not Installed")
            return;
        }
        // Show the install prompt.
        promptEvent.prompt();
        // Log the result
        const result = await promptEvent.userChoice;
        console.log('👍', 'userChoice', result);
        // Reset the deferred prompt variable, since
        // prompt() can only be called once.
        window.deferredPrompt = null;
        // Hide the install button.
        divInstall.classList.toggle('hidden', true);
    });
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('appinstalled', event);
});









window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);
    // Clear the deferredPrompt so it can be garbage collected
    window.deferredPrompt = null;
  });
