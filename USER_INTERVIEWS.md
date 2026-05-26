## Interview 1: Bhavya Patel

**Role:** Incubation Associate at PIERC, Founder at Startupreneur.
**Company Stage:** Early-stage startup ecosystem and founder advisory.

I reached out to Bhavya to get a pulse check on whether our core problem actually resonated with someone deeply entrenched in the early-stage founder ecosystem. I pitched him the tool, expecting him to care about the user interface or how fast the report generates. Instead, he stopped me immediately to question the underlying mechanics.

> “How will AI know whether the founder is spending more or less?”

> “How much will be the accuracy?”

> “The idea is interesting, but I would trust it only if the recommendations are based on actual numbers.”

The most surprising thing he said was flat out distrusting the phrase “AI recommendation engine.” He assumed the financial recommendations were going to be probabilistic, hallucinated LLM guesses rather than hard math. He did not trust AI to handle a startup budget.

That single insight completely changed our design and product positioning. I realized we could not just slap an “AI” label on the tool and expect trust. I completely overhauled the results dashboard to explicitly show that the calculations are deterministic and rule-based. We redesigned the UI to clearly separate the strict mathematical pricing baselines from the LLM summarization layer, making sure the user knows exactly where the numbers are coming from.

---

## Interview 2: Pranav Devani

**Role:** Founder and CEO at Tryz.
**Company Stage:** Early-stage startup.

I sent the live MVP over to Pranav because I wanted to watch a real founder attempt to navigate the data entry flow without me guiding them. I wanted to see if the financial inputs made sense.

> “The idea actually feels useful for startups once the stack starts growing.”

> “As a MVP it is quite good and perfectly fine for now.”

> “The overall idea actually makes sense for growing teams.”

The most surprising thing was how rapidly a tiny UI bug evaporated his trust in the entire platform. The recommendation engine was working perfectly on the backend, but because of a numeric input field glitch where typing a number appended it instead of replacing it, he immediately focused entirely on the friction.

This radically changed my design priorities. I stopped working on the backend architecture and immediately overhauled the input validation and numeric state handling in the React forms. It proved that if the data entry feels buggy, founders will assume the financial calculations are also buggy. I also updated the design to easily accommodate a larger catalog of tools based on his request to expand the pricing manifest.

---

## Interview 3: Apporv Jha

**Role:** Founder at Kya Hal Chal Podcast, Jal Foundation.
**Company Stage:** Early-stage founder and community builder.

I spoke with Apporv because I wanted to test the product with a founder outside the hard tech SaaS bubble. I explained the concept of auditing AI subscriptions to see if it felt like a burning pain point.

> “Working dekh kar better samajh aayega.”

> “Agar team mein multiple tools use ho rahe ho toh useful lag raha hai.”

> “I think technical startups would relate to this more.”

The most surprising takeaway was realizing that AI spending is absolutely not a universal founder problem yet. For many early-stage or non-technical founders, their AI stack is still small enough that they do not actively think about optimization or overlap.

This conversation forced a massive pivot in our landing page design and overall positioning. I completely scrapped the idea of marketing to “all startup founders.” I redesigned the hero copy and the CTA flow to speak specifically to engineering leaders, technical founders, and scaling startups already dealing with multiple AI subscriptions and infrastructure costs. That tightened the target audience significantly and made the messaging much clearer.
