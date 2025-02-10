class AudioManager {
   private static instance: AudioManager;
   private backgroundMusic: HTMLAudioElement;
   private _isPlaying: boolean = false;

   public get isPlaying(): boolean {
      return this._isPlaying;
   }

   private constructor() {
      this.backgroundMusic = new Audio("/audio/bg.mp3");
      this.backgroundMusic.loop = true;
   }

   static getInstance(): AudioManager {
      if (!AudioManager.instance) {
         AudioManager.instance = new AudioManager();
      }
      return AudioManager.instance;
   }

   playMusic() {
      if (this.isPlaying) return;

      this.backgroundMusic
         .play()
         .then(() => {
            this._isPlaying = true;
         })
         .catch((error) => {
            console.error("Error playing background music:", error);
         });
   }

   stopMusic() {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
      this._isPlaying = false;
   }
}

export default AudioManager;
