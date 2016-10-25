class MockSong {
	static getAudioPlayer() {
		let audioPlayer = new Audio()
		audioPlayer.volume = parseFloat(0.0) // parseFloat() is for Safari
		return audioPlayer
	}

	static getSongId() {
		return '~Test Artist - Song Name'
	}

	static getSongIdWithSubtitle() {
		return '~Test Artist - Song Name (A Song Subtitle)'
	}

	static getSong() {
		return {
			title: "Song Name",
			artist: "~Test Artist",
		}
	}

	static getSongWithSubtitle() {
		return {
			title: "Song Name",
			subtitle: "(A Song Subtitle)",
			artist: "~Test Artist",
		}
	}
}

export default MockSong
