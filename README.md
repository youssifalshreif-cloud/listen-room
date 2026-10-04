# Listen Room
1. Install Node.js, then in this folder run: npm install && npm start
2. Open http://localhost:3000 on a PC (works for mic access on localhost).
3. For phones, mic access needs HTTPS. Use a tunnel (e.g. `npx cloudflared tunnel --url http://localhost:3000`) or deploy to Render/Railway.
4. Sender: create a code. Listener: enter the code. Sender taps Allow.
