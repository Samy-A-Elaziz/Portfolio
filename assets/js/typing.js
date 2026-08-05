/**
 * TYPING.JS
 * A simple "typewriter" effect: types out each word in a list one letter at
 * a time, pauses, deletes it, then moves on to the next word (and loops).
 * Used for the "Expertise in ..." line in the hero section.
 */
class TypingEffect {
    /**
     * @param {string} elementId - id of the element the text is typed into
     * @param {string[]} words - list of words/phrases to cycle through
     */
    constructor(elementId, words) {
        this.element = document.getElementById(elementId);
        this.words = words;
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;

        if (!this.element) return;

        this.element.classList.add("typing-cursor-node");
        this.tick();
    }

    tick() {
        const currentWord = this.words[this.wordIndex];
        let delay = 120; // typing speed (ms per letter)

        if (this.isDeleting) {
            delay = 45; // deleting is a bit faster than typing
            this.charIndex--;
        } else {
            this.charIndex++;
        }

        this.element.textContent = currentWord.substring(0, this.charIndex);

        if (!this.isDeleting && this.charIndex === currentWord.length) {
            // Finished typing the word: pause, then start deleting
            delay = 2200;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            // Finished deleting: move to the next word
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            delay = 400;
        }

        setTimeout(() => this.tick(), delay);
    }
}
