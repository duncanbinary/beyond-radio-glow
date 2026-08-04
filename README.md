# Beyond Radio Hub

🎧 Beyond Radio - Premium One Page Website

Build a premium, responsive one-page website for an online radio station called Beyond Radio.

The website should feel like a modern digital media platform similar to Spotify, Apple Music, BBC Sounds and Radio Garden, with beautiful animations, glassmorphism effects and a strong broadcast identity.

The overall experience should immediately encourage visitors to press Listen Live.

Brand

Station Name

Beyond Radio

Tagline

Boundless Radio

Brand Colours

Primary Orange

#F57C00

Deep Orange

#E65100

Background

#111111

Secondary Background

#1C1C1C

White

#FFFFFF

Light Grey

#D8D8D8

Use glowing orange highlights throughout the website.

Fonts

Use

 Poppins

 Montserrat

Modern, bold typography.

Navigation

Sticky navigation.

Menu items

 Home

 Listen Live

 About

 Programming

 Contact

Smooth scrolling.

HERO SECTION

Create a full-screen hero section.

Dark premium background.

Animated sound waves.

Subtle moving particles.

Display the official Beyond Radio logo.

Large Heading

Beyond Radio

Subtitle

Boundless Radio

Description

Beyond Radio is a modern digital radio station connecting communities through music, news, education, culture and inspiring conversations. Broadcasting beyond borders, we bring people together through powerful storytelling and quality entertainment.

Large glowing orange button

▶ Listen Live

When clicked it should smoothly scroll to the player.

Include a subtle animated equalizer behind the hero.

LIVE PLAYER

This is the focal point of the entire website.

Create a beautiful glassmorphism player card positioned in the centre of the page.

Do NOT use an iframe.

Instead build the player directly into the website.

Use this stream URL:

const streamUrl = "https://sakazaradio.co.za/beyondradio";

The player should include:

 Beyond Radio logo

 LIVE ON AIR badge

 Station name

 Tagline

 Status indicator

 HTML5 Audio Player

 Play button

 Pause button

 Volume slider

 Animated equalizer when playing

 Orange glowing accents

 Responsive layout

Use the following HTML structure.

<div class="player">

<img src="/images/beyond-radio-logo.png" class="logo" alt="Beyond Radio Logo">

<div class="live">
🔴 LIVE ON AIR
</div>

<h2>Beyond Radio</h2>

<div class="tagline">
Boundless Radio
</div>

<div id="status">
Ready to Play
</div>

<audio id="audio" controls></audio>

<div class="controls">

<button onclick="playStream()">
▶ Play
</button>

<button onclick="pauseStream()">
⏸ Pause
</button>

</div>

<input
type="range"
min="0"
max="1"
step="0.01"
value="1"
onchange="setVolume(this.value)"
>

</div>

Use this JavaScript.

const streamUrl = "https://sakazaradio.co.za/beyondradio";

const audio = document.getElementById("audio");
const status = document.getElementById("status");

audio.src = streamUrl;

function playStream(){
audio.play();
status.innerHTML="🟢 Playing Live";
}

function pauseStream(){
audio.pause();
status.innerHTML="⏸ Paused";
}

function setVolume(v){
audio.volume=v;
}

audio.addEventListener("waiting",()=>{
status.innerHTML="🟡 Buffering...";
});

audio.addEventListener("playing",()=>{
status.innerHTML="🟢 Playing Live";
});

audio.addEventListener("error",()=>{
status.innerHTML="🔴 Stream Offline";
});

audio.load();

Style the player using the Beyond Radio colours.

Replace every green colour from the original player with glowing orange.

Player styling should include:

 Glassmorphism

 Orange gradients

 Soft shadows

 20px border radius

 Modern buttons

 Animated equalizer

 Floating animation

 Hover effects

 Premium appearance

Desktop width approximately 480px.

Fully responsive.

ABOUT

Section title

About Beyond Radio

Content

Beyond Radio is a digital community radio station dedicated to informing, inspiring and connecting audiences through quality music, news, culture, education and meaningful conversations.

Our mission is to create a platform where every voice matters while embracing innovation, diversity and community development.

FEATURED PROGRAMMING

Create animated cards.

Include

🎙 Talk Shows

🎵 Music

🌍 Community News

🎤 Interviews

❤️ Health & Wellness

🎓 Education

🏆 Sports

🌱 Environment

Cards should animate on hover.

WHY LISTEN

Create three premium glass cards.

Community First

Giving every voice a platform.

Diverse Content

Music, education, news and entertainment.

Listen Anywhere

Stream Beyond Radio from anywhere in the world.

SOCIAL MEDIA

Display modern glowing icons.

Facebook

Instagram

TikTok

YouTube

WhatsApp

Links should be editable.

CONTACT

Premium glass card.

Editable information.

Phone

Email

WhatsApp

Location

Large Contact Us button.

FOOTER

Display

Beyond Radio

Boundless Radio

Powered by

Sakaza.Radio Tech

Copyright © 2026 Beyond Radio

DESIGN STYLE

The entire website should feel like a premium international streaming service.

Inspired by

 Spotify

 Apple Music

 BBC Sounds

 SoundCloud

 Radio Garden

Include:

 Glassmorphism

 Orange glow effects

 Animated equalizers

 Audio wave animations

 Floating gradients

 Soft moving particles

 Smooth page transitions

 Rounded cards

 Professional broadcasting aesthetic

 Fast loading

 Mobile-first design

 SEO optimized

 Accessibility compliant

IMPORTANT

The Live Player should be the centerpiece of the homepage. Design it as if it were the hero feature of a modern streaming platform. The player must use the public streaming URL:

const streamUrl = "https://sakazaradio.co.za/beyondradio";

Do not use an iframe, the Icecast :8000 port, or a stream. subdomain. Build the player natively into the page so it blends seamlessly with the overall design.

Use the official Beyond Radio logo and maintain the orange, black, and white brand identity consistently throughout the website. The final result should look like a polished, world-class digital radio station ready for launch.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://beyond-radio-glow.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/758c5caf-c1fb-41cf-8d84-19144072605a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
