import { useEffect, useState } from "react";

export function Quote() {

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const x = Math.floor(Math.random() * Quotes.length);
        setIndex(x);
    }
        , []);

    return (
        <div className="bg-slate-200 h-screen flex flex-col justify-center items-center ">
            <div className="max-w-3xl m-5">
                <div className="text-3xl font-bold">
                    {Quotes[index].quote}
                </div>
                <div className="text-2xl font-semibold mt-4">
                    -{Quotes[index].author}
                </div>
                {/* <div>
                    {Quotes[index].position}
                </div> */}
            </div>

        </div>
    )
}

interface QuoteType {
    quote: string,
    author: string
}

type QuotesType = QuoteType[];

const Quotes: QuotesType = [
    {
        "quote": "There is nothing to writing. All you do is sit down at a typewriter and bleed.",
        "author": "Ernest Hemingway"
    },
    {
        "quote": "You should write because you love the shape of stories and sentences and the creation of different words on a page. Writing comes from reading, and reading is the finest teacher of how to write.",
        "author": "Annie Proulx"
    },
    {
        "quote": "The purpose of a writer is to keep civilization from destroying itself.",
        "author": "Albert Camus"
    },
    {
        "quote": "Don’t bend; don’t water it down; don’t try to make it logical; don’t edit your own soul according to the fashion. Rather, follow your most intense obsessions mercilessly.",
        "author": "Franz Kafka"
    },
    {
        "quote": "You can’t wait for inspiration. You have to go after it with a club.",
        "author": "Jack London"
    },
    {
        "quote": "The role of a writer is not to say what we all can say, but what we are unable to say.",
        "author": "Anaïs Nin"
    },
    {
        "quote": "To survive, you must tell stories.",
        "author": "Umberto Eco"
    },
    {
        "quote": "Writing is a form of therapy; sometimes I wonder how all those, who do not write, compose or paint can manage to escape the madness, the melancholia, the panic and fear which is inherent in a human situation.",
        "author": "Graham Greene"
    },
    {
        "quote": "A word after a word after a word is power.",
        "author": "Margaret Atwood"
    },
    {
        "quote": "We write to taste life twice, in the moment and in retrospect.",
        "author": "Anaïs Nin"
    }
]