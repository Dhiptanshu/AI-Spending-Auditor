# Telemetry & Metrics

We are treating this tool purely as a high-intent infrastructure workflow, so we are not optimizing for generic consumer metrics like daily engagement or session length. 

### The North Star Metric
Our absolute North Star is: **Completed Audits Resulting In Qualified Consultation Requests.**

A completed audit without any downstream engagement is cool, but the real signal is whether our report was compelling enough for a startup to request additional help. We want to uncover operational inefficiency, create internal discussion, and ultimately generate qualified procurement conversations.

### 3 Input Metrics that Drive the North Star

**1. Audit Completion Rate** *(Completed audits ÷ Started audits)*
If this is low, it means we have excessive friction, an unclear value proposition, or a confusing form UX. This is the very first metric I am monitoring.

**2. Public Report Share Rate**
We need to track how often users copy report links, share screenshots, and revisit results. The strongest growth loop is organic distribution through engineering and founder communities. A high share rate proves the product is generating discussion-worthy insights rather than just functioning as a disposable calculator.

**3. Consultation Conversion Rate** *(Consultation requests ÷ Completed audits)*
This is the clearest signal that users actually trust our recommendations, are feeling real financial pain, and believe that further optimization is valuable enough to talk to us.

### What I Would Instrument First
On day one, the instrumentation layer needs to fire events for:
* Audit started
* Audit completed
* Recommendation viewed
* Report shared
* Lead submitted
* Consultation requested

I also want to capture the payload data: average estimated annual savings, the most common tool combinations, and the specific step where we see the highest abandonment. This tells us if users are actually discovering inefficiencies and if they trust the workflow.

### The Pivot Threshold
The biggest, most glaring pivot signal would be if we see a high audit completion rate but an extremely low consultation conversion rate (e.g., 500 completed audits, but <2% consultation requests). 

That tells a brutal truth: either the savings recommendations aren't painful enough, or the product is interesting but not operationally important. 

If we hit that threshold, I would immediately reposition the product. I would pivot away from procurement and optimization workflows, and move aggressively toward benchmark visibility, AI infrastructure analytics, and recurring spend monitoring.
