const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

// Show new quote
function newQuote() {
	// Pick a random quote from apiQuotes array
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	authorText.textContent = quote.author ? quote.author : 'Unknown';

	//Check Quote length to determine styling
	if (quote.text.length > 120) {
		quoteText.classList.add('long-quote');
	} else {
		quoteText.classList.remove('long-quote');
	}

	quoteText.textContent = quote.text;
}

// Get Quotes From API
async function getQuotes() {
	const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

	await fetch(apiUrl)
		.then(res => res.json())
		.then(res => {
			apiQuotes = res;
			newQuote();
		})
		.catch(error => console.log(error));
}

// Tweet quote
function tweetQuote() {
	const twitterUrl = `https:twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes();