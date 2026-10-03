# internet-connection-tracker

A lightweight, vanilla JavaScript utility that diagnoses, verifies, and displays network connectivity details—including live connection status, public IP address, and estimated download speeds—directly on a web interface.

## Features

- **True Online Verification:** Combines the browser's native `navigator.onLine` status with a live external API call to confirm absolute WAN connectivity.
- **Public IP Fetching:** Integrates with the `ipify` API to securely retrieve and display the client's public IPv4 address.
- **Cross-Browser Speed Estimation:** Implements vendor-prefixed fallback handling for `navigator.connection` to capture estimated downlink speeds safely.
- **Graceful Error Handling:** Automatically transitions to a safe, clean offline UI state if network calls fail, timeouts occur, or the device physically disconnects.

## How It Works

1. **Initialization:** The script listens for the window's `load` event to fire, launching the `analyzeInternetConnection` workflow.
2. **Initial State Flagging:** Interface text elements temporarily switch to a `"Checking..."` state.
3. **API Ping & Speed Capture:** If online, it sends a payload request to `api.ipify.org`. If the browser supports the Network Information API, it securely extracts the estimated `downlink` speed (Mbps).
4. **UI Updates:** Modifies elements targeted by their respective IDs (`internetStatus`, `internetIpAddress`, and `internetSpeed`).

## Code Structure

- `analyzeInternetConnection()`: The main driver function initializing DOM selections, handling checking states, and coordinating asynchronous API requests.
- `defaultInternetConnection(...)`: The reset utility function that safely overrides UI elements with uniform placeholder text (`Disconnected`, `-`) when offline or during connection dropouts.

## Setup & Integration

To use this script, ensure your HTML template includes DOM elements matching the required text identifier IDs:

```html
<div >
  <p>Internet Status: <span id="internetStatus">Checking...</span></p>
  <p>IP Address: <span id="internetIpAddress">-</span></p>
  <p>Estimated Speed: <span id="internetSpeed">-</span></p>
</div>

<!-- Link your script file here -->
<script src="script.js"></script>
```

## Browser Compatibility Constraints

- **IP Discovery:** Requires global support for the modern `fetch` API.
- **Speed Reporting:** Connection speed estimations rely on the `NetworkInformation.downlink` standard. This feature is fully active across modern Chromium engines (Chrome, Edge, Opera, Android WebViews) but will scale down gracefully to display `"Unknown"` on platforms like Apple Safari or Mozilla Firefox where the standard remains unsupported.
