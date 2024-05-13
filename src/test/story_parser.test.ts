import { getStory } from "@/lib/story_parser"
import { test, expect } from "vitest"

const url = "obt/main/level_main_06-02_beg.txt"
const exp = `Oh... Rosmontis, what are you doing?
[name="Rosmontis"]  I... I wanna fix this terminal.
[name="Rosmontis"]  Six years of memories up to last year... I saved them all in here...
[name="Rosmontis"]  This morning, I went to read the log from June 12, but the screen wouldn't turn on.
[name="Rosmontis"]  What if... what if I can't ever read them again...?
[name="Rosmontis"]  The March 14th log, when I went to the botanical gardens with daddy, or hiking in July, or the time when mommy...
[name="Rosmontis"]  ...Mommy...
D- don't cry! Listen, you're not great with screens, right?
Why not wait until Scout can help you fix it? Or Closure?
I'll take it to Closure for you. She'll fix it up lickety-split!
[name="Rosmontis"]  Scout...
[name="Rosmontis"]  Is Scout that one operator who moves around all quiet?
That's him! You know him?
[name="Rosmontis"]  Yeah.
[name="Rosmontis"]  With that perfectly polished look... like a porcelain doll.
[name="Rosmontis"]  There he is.
Huh...?
[name="Scout"]  I had yet to hear your estimation of me. I now understand how weak it is.
When did you get here?!
[name="Scout"]  You could say I have always been here. I am used to concealing myself.
[name="Rosmontis"]  So Mr. Scout was here all along.
[name="Rosmontis"]  Why didn't Blaze sense it?
I... I wasn't paying attention. I just didn't notice!
Hey, if you were standing here all this time, why didn't you help her fix it?
[name="Scout"]  Forgive me. We are mere moments from undertaking a mission. I must focus my energy on calibrating my weaponry.
[name="Scout"]  You might ask Closure, or the good Mechanist to assist you.
Are you about to go save Dr. {@nickname}?
[name="Ace"]  Yes.
Oh. You're going too.
[name="Ace"]  It's me we're talking about. If I didn't go, what kind of joke would Rhodes Island's elite operators be?
[name="Scout"]  And what did Ascalon say?
[name="Ace"]  The usual. She's not going. Always there with Kal'tsit, that one.
[name="Scout"]  Did it ever occur to you... That now is perhaps not the optimal time?
[name="Ace"]  But it might be our last chance.
[name="Ace"]  Chernobog is probably going to turn back deep into Ursus to avoid that Catastrophe. And a rescue operation in the Ursus interior is going to be damn near impossible.
I keep hearing you talk about it, but is this Dr. {@nickname} really worth all this?
[name="Ace"]  Worth as much as Amiya and Kal'tsit.
[name="Rosmontis"]  Have I met the Doctor?
[name="Ace"]  Not yet. But you will soon.
[name="Rosmontis"]  Good. I want to know what the Doctor is like too.
[name="Rosmontis"]  I really, really want to.
[name="Scout"]  You will, kitten.
By the way, Ace, there's an uninfected girl named GreyThroat on your team.
[name="Ace"]  I'm aware. She's been training in isolation.
[name="Ace"]  Listen, Blaze. I've been working with her for a few months now. She has trouble expressing herself, but she's not a bad person.
She looked my teammate in the eye and asked, 'How hard could it be to be Infected?'
[name="Ace"]  I know. But it might have been a legitimate question to her. She might really be curious.
[name="Ace"]  It's not my place to demand an operator turn her opinion on a dime. And GreyThroat has never once questioned orders.
I don't care. I'm not going to stand by and let her insult my teammates, and I sure as hell won't let her disgrace the struggle of the Infected.
[name="Ace"]  Now's not the time. I can see the rage you're holding back. But really, not now.
She said it right in front of me!
[name="Scout"]  Take a breath, Big Cat.
[name="Scout"]  You have a task at hand yourself.
...I do.
Fine. We'll deal with it when you get back.
Since when is Ace more senior than me?
[name="Ace"]  When you take that tone, I start to think maybe you're screwing around.
[name="Scout"]  She may very well be mocking you.
When he goes two days without shaving, he'll definitely look way more senior.
[name="Rosmontis"]  Ace's beard is very manly.
[name="Ace"]  ...Hm.
Hahaha! I have to go move some stuff around. Got my own job to do, you know. Later.
Let's get a drink when I'm done!
[name="Scout"]  Try not to puke this time.
[name="Scout"]  Misery spent two hours scrubbing the floor. I wager he would vomit himself when faced with that task again.
Who knew you could hold your liquor so well!
Rosmontis, Mechanist will give you back your terminal in a bit.
Be a good girl and wait patiently. But don't forget either!
[name="Rosmontis"]  I'll definitely remember! Bye bye!
[name="Scout"]  Don't burn yourself!
Relax. I can control my own Arts.
[name="Blaze"]  ...How is it you went before me?
[name="Blaze"]  Ace, was some uninfected girl like GreyThroat really worth training?
[name="Blaze"]  How much trust did we earn? And how much trust did we give?
[name="Blaze"]  If the Doctor...
[Decision(options="What are you saying over there?!;......;If I don't believe in Rhodes Island...?", values="1;2;3")]
[name="Blaze"]  I'm saying bad things about you. To your face.
[name="Blaze"]  If there's a Doctor hanging around here, hurry up and come out already. You'll need some fancy Arts to hide behind that wall if you don't want me to find you.
[name="Blaze"]  Then I'll string you up on a lamppost as bait for Reunion. Don't worry! You won't die. A few bolts and a knife or two never hurt anyone.
[name="Blaze"]  ....sigh.
[name="Blaze"]  Sigh!
[name="Blaze"]  Did Amiya send you?
[name="Blaze"]  Whatever. That's what she's best at. And what she's worst at...
[name="Blaze"]  I keep trying to remind her, to get her thinking about how she's still just a kid... it always seems to have the opposite effect.
[name="Blaze"]  I guess she'll never be able to put down that grown up persona of hers as long as she's the leader of Rhodes Island.
[name="Blaze"]  Of course, if it wasn't Amiya who sent you, if you decided to come keep me company all by yourself, I'm not against the idea.
[name="Blaze"]  ...Hold me back? Haha! I could carry three of you on my back and I wouldn't even notice. One little Dr. {@nickname} can't hold me back.
[name="Blaze"]  Hey, look over there.
[name="Reunion Member"]  Go on! Get out of here! We don't want to fight!
[name="L. G. D. Officer"]  Hmph... we won't yield to the Infected!
[name="Reunion Member"]  You're outnumbered! What's the point?
[name="L. G. D. Officer"]  Duty!
[name="Reunion Member"]  Don't blame us for what happens! You see those monsters behind us? Just run already!
[name="L. G. D. Officer"]  What monsters?!
[name="Blaze"]  See that Reunion group cutting through the alleys? They're picking at Lungmen's vanguard units. They won't hold for long...
[name="Blaze"]  Give me a path.
[Decision(options="The usual, or...?", values="1;2;3")]
[name="Blaze"]  The fastest, of course!
[name="Blaze"]  Don't give me that look. It's not like I've never carried you before.
[name="Blaze"]  Here we go! Smash Reunion and save the Lungmenites!
`

test.skip("story parser", async ()=>{
  const story = await getStory(url)
  if (!story) {
    throw new Error("no story")
  }
  expect(story.join("\n")).toBe(exp)
})


