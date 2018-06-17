---
title:   Markov Chain Rhythms using SonicPi (ft. Drake)
author:  omardelarosa
timestamp: 1529248388892
created_at: 1529248388892
published_at: 1529248388892
slug:    markov-chain-rhythms
ogDescription: an article about building rhythms, chords and melodic patterns using markov chaining and then applying drake's voice on top by omar delarosa

---

A few weeks back [I started dabbling in using markov chains to make hip hop music](https://www.omardelarosa.com/posts/markov-chain-music.html).  When I wrote that last post, there was one hurdle that I failed to overcome:  generative beats.  However, I spent the past few weeks thinking about how best to represent beats in a sane way in code.

## Discovering the Atoms
What are beats?  Are they the individual triggerings of samples?  Or are they groups of triggerings?  Or are they the span of time between triggering samples?  I have settled on something close to the latter:  beats can best be described as the time intervals (or "durations") between triggering samples, which I shall henceforth call "notes".  Okay, so what are the atomic units here?

Given a simple rhythm such as this, where C is a kick drum hit and G is a snare drum note:

![](https://i.imgur.com/XV5CvfK.png)

(**Fig. 1**)

Is each quarter note the most atomic unit?  Are the pairs?  When I first started, I tried to think of each note as the most atomic unit and randomize the durations.  However, this generated some pretty a-rhythmic, unsteady sounding stuff.  For example, imagine the following SonicPi "random duration generator"

```ruby
live_loop :randomized_kicks do
  sample :bd_mehackit
  sleep rand(0.0..1.0)
end
```

This generates some extremely arhythmic, unlistenable stuff.  Clearly the individual note is *not* the atomic unit of rhythm.

Taking a bit of a cue from how TidalCycles defines its DSL as little strings defining cycles of note data, I got to thinking:  what if the groupings of note/durations are the atomic unit?  The "pattern" or cycle is the atom and each note/duration is just an electron/proton/muon/gluon-type elementary particle?

Let's consider a different way to express the rhythm using a new atomic unit:  the rhythm word.

```ruby

T = 4.0 # To make the durations more readable and use a sort of time signature

# Collection of pattern "atoms" or "rhythm words"
patterns = [
	(bools, 1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0),   # Kick / C
	(bools, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0)    # Snare / G
]

live_loop :kicks do
	sample :bd_mehackit if patterns[0].tick
	sleep T/16   # 16 is the total length of the pattern or its resolution
end

live_loop :snares do
	sample :sn_dolf if patterns[0].tick
	sleep T/16   # 16 is the total length of the pattern or its resolution
end
```

Now this is much more "rhythmic".  It has regularity and from an aesthetic perspective passes as "music".  However, it lacks variety and interestingness as a listenable piece of music.  It seems like atoms alone don't cut it.  The atoms require a chemistry and the rhythm words require a grammar.

## Discovering Chemistry

In "interesting" music, the same pattern doesn't usually repeat for several minutes and then terminate.  Sure, there are some repitions but there are also variations on the pattern.  These occur at different points selected by the "composer".  What we need is a way to select different patterns and form chains of patterns emulating the decisions made by a composer at "build time".

One way we could do this is using pure chance:

```ruby
T = 4.0

kick_patterns = [
  (bools, 1,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0), # Kick Pattern 1 / C
  (bools, 1,0,0,0, 0,0,1,0, 0,1,1,0, 0,1,1,0) # Kick Pattern 2 / C
].ring

snare_patterns = [
  (bools, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0), # Snare Pattern 1 / G
  (bools, 1,0,1,0, 1,0,0,0, 0,0,0,0, 1,0,1,0)  # Snare Pattern 2 / G
].ring

live_loop :kicks do
  pat = kick_patterns.choose # randomly select pattern
  pat.length.times do
    sample :bd_mehackit if pat.tick
    sleep T/16
  end
end

live_loop :snares do
  pat = snare_patterns.choose # randomly select pattern
  pat.length.times do
    sample :sn_dolf if pat.tick
    sleep T/16
  end
end
```

This actually begins to sound more "composed" now.  There are variations here.

However, the "grammar" isn't very smart.  For example if Snare Pattern 2 is followed by another Snare Pattern 2 you end up with something like:

![](https://i.imgur.com/8BWeVwi.png)

Notice the weird string of eight notes in the middle there.  Assuming unweighted randomization and "fair coins" during each `.choose` call, this weird string of eight note snares would happen once every 4 cycles on average.  We can do better.

## Better Coin Flips

By bringing in markov chaining, we can preserve the randomness and non-determinism, but avoid too many "weird sounding" moments.  Let's use a different data structure here:

```ruby
T = 4.0

# State machine utility functions
define :markov do |a, h| h[a].sample; end # Chooses the next state at  random from hash
define :g do |k| get[k]; end # simplified root note in scale getter
define :s do |k, n| set k, n; end # simplified root note setter
define :mnote do |key,chain| s key, (markov (g key), chain); g key; end

set :k, 0
set :s, 0

K = {
  0 => [0,1],
  1 => [0,1]
}

S = {
  0 => [0,0,0,0, 0,0,0,1], # 1/8 chance of choosing snare pattern 2
  1 => [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,1] # 1/16 chance of choosing snare pattern 2
}

kick_patterns = [
  (bools, 1,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0), # Kick Pattern 1 / C
  (bools, 1,0,0,0, 0,0,1,0, 0,1,1,0, 0,1,1,0) # Kick Pattern 2 / C
].ring

snare_patterns = [
  (bools, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0), # Snare Pattern 1 / G
  (bools, 1,0,1,0, 1,0,0,0, 0,0,0,0, 1,0,1,0)  # Snare Pattern 2 / G
].ring

live_loop :kicks do
  pat = kick_patterns[mnote :k, K] # markov select pattern
  pat.length.times do
    sample :bd_mehackit if pat.tick
    sleep T/16
  end
end

live_loop :snares do
  pat = snare_patterns[mnote :s, S] # markov select pattern
  pat.length.times do
    sample :sn_dolf if pat.tick
    sleep T/16
  end
end

```

By using markov chaining, we've now sort of "stacked the deck" or, to mix metaphors even further, created a strategically unfair coin.  We've now reduced the probability of two measures of Snare Pattern 2 following each other to just `1/16 * 1/16` or `1/256`.  This makes the weirdness of too many snare 1/8th notes happen way less often (or statistically maybe not happen at all on most songs).

This creates an overall less weird-sounding rhythm.

## But Does It Scale?

Now the question is: can we apply this system to harmonies?  The answer is absolutely.  Each scale often brings with it a "family" of chords.  7 per scale when dealing with standard western standard "major" scales: `I - ii - iii - IV - V - vi - vii*`.  ([You can read more about chord degrees elsewhere](https://en.wikipedia.org/wiki/Roman_numeral_analysis), if you are interested.)

We can apply the same approach of rhythm pattern selection to chord selection:

```ruby

## -- Add state-machine stuff here...

set :k, 1

# Scale
sc_root = :F2
sc_type = :major
sc = scale(sc_root, sc_type)

# Chords in scale -- chords are defined here.
chords = (1..7).map {|n| chord_degree n, sc_root, sc_type }.ring

# Markov chain representing a I-IV-V chord progression, with a little randomness
K = {
  1 => [1,1,4,5],
  4 => [5],
  5 => [1,4]
}

live_loop :chords do
  use_synth :fm
  chr = chords[mnote :k, K]
  dur = T/1
  play chr[0], release: dur # first note of triad
  play chr[1], release: dur # second note of triad
  play chr[2], release: dur # third note of triad
  play chr[3], release: dur # 7th note for "flavor"
  sleep dur
end
```

We can even combine this with the beat above and create a rudimentary tune:

```ruby

## Define patterns and helper functions here...

live_loop :chords do
  use_synth :fm
  chr = chords[mnote :k, K]
  dur = T/1
  play chr[0], release: dur
  play chr[1], release: dur
  play chr[2], release: dur
  play chr[3], release: dur
  sleep dur
end

live_loop :kicks do
  pat = kick_patterns[mnote :b, B] # markov select pattern
  pat.length.times do
    sample :bd_mehackit if pat.tick
    sleep T/16
  end
end

live_loop :snares do
  pat = snare_patterns[mnote :s, S] # markov select pattern
  pat.length.times do
    sample :sn_dolf if pat.tick
    sleep T/16
  end
end
```

## Adding the Sugar

The only thing missing here is a little bit of melody.  The melody works exactly in the same way as all the pattern selection stuff above, with only minor variation.  At first, I attempt to just let the melody be a free floating markov chain.  But like the simple randomization which can put awkward patterns together, letting the melody be a single, giant markov chain failed to capture the atomic unit of melody:  the musical phrase.

So like chords and rhythm patterns, melodies need atomic units from which to select using the markov chain and building the atomic unit randomly can sound too weird/randomized and non-musical.  So let's begin with how to generate the melodies randomly but keep each randomized pattern "frozen" so the markov chain can return to phrases and maintain a sort of motif/theme (again, better aesthetically speaking):

```ruby
# Melody Maker -- makes a single melody pattern of length len and moves away from root in range 2
define :make_melody do |len = 16, rng = 2|
  (1..len).map{|n| ((rng*-1)..rng).to_a.sample }.ring  # This uses a .sample and a range, but can also be done with cosine functions.
end

# Generates 4 melody patterns
melodies = (1..4).map{|n| make_melody(16,2)}.ring

# Melodies -- markov chain for switching patterns
Y = {
  0 => [1],
  1 => [0, 1, 2],
  2 => [1, 2],
  3 => [1]
}
```

This melody patterning can be combined with all the bits above by modifying the `:chords` `live_loop` as follows:

```ruby
live_loop :chords do
  use_synth :fm
  chr = chords[mnote :k, K]
  dur = T/1
  play chr[0], release: dur
  play chr[1], release: dur
  play chr[2], release: dur
  play chr[3], release: dur

  melody = melodies[mnote :y, Y]
  use_synth :pretty_bell
  4.times do
    play sc[melody.tick] + 36
    sleep T/4
  end
end
```

## All Together Now

So with this system you can make better sounding randomized music than using pure randomization.  Here is the whole SonicPi piece together:

```ruby
T = 4.0

# State machine utility functions
define :markov do |a, h| h[a].sample; end # Chooses the next state at  random from hash
define :g do |k| get[k]; end # simplified root note in scale getter
define :s do |k, n| set k, n; end # simplified root note setter
define :mnote do |key,chain| s key, (markov (g key), chain); g key; end

# Initializes states for all state machines
set :k, 1
set :b, 0
set :s, 0
set :y, 0

# Scale
sc_root = :F2
sc_type = :major
sc = scale(sc_root, sc_type)

# Chords in scale -- chords are defined here.
chords = (1..7).map {|n| chord_degree n, sc_root, sc_type }.ring

K = {
  1 => [1,1,4,5],
  4 => [5],
  5 => [1,4]
}

B = {
  0 => [0,1],
  1 => [0,1]
}

S = {
  0 => [0,0,0,0, 0,0,0,1], # 1/8 chance of choosing snare pattern 2
  1 => [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,1] # 1/16 chance of choosing snare pattern 2
}

kick_patterns = [
  (bools, 1,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0), # Kick Pattern 1 / C
  (bools, 1,0,0,0, 0,0,1,0, 0,1,1,0, 0,1,1,0) # Kick Pattern 2 / C
].ring

snare_patterns = [
  (bools, 0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0), # Snare Pattern 1 / G
  (bools, 1,0,1,0, 1,0,0,0, 0,0,0,0, 1,0,1,0)  # Snare Pattern 2 / G
].ring

# Melody Maker -- makes a single melody pattern of length len and moves away from root in range 2
define :make_melody do |len = 16, rng = 2|
  (1..len).map{|n| ((rng*-1)..rng).to_a.sample }.ring  # This uses a .sample and a range, but can also be done with cosine functions.
end

# Generates 4 melody patterns
melodies = (1..4).map{|n| make_melody(16,2)}.ring

# Melodies -- markov chain for switching patterns
Y = {
  0 => [1],
  1 => [0, 1, 2],
  2 => [1, 2],
  3 => [1]
}

live_loop :kicks do
  pat = kick_patterns[mnote :b, B] # markov select pattern
  pat.length.times do
    sample :bd_mehackit if pat.tick
    sleep T/16
  end
end

live_loop :snares do
  pat = snare_patterns[mnote :s, S] # markov select pattern
  pat.length.times do
    sample :sn_dolf if pat.tick
    sleep T/16
  end
end

live_loop :chords do
  use_synth :fm
  chr = chords[mnote :k, K]
  dur = T/1
  play chr[0], release: dur
  play chr[1], release: dur
  play chr[2], release: dur
  play chr[3], release: dur

  melody = melodies[mnote :y, Y]
  use_synth :pretty_bell
  4.times do
    play sc[melody.tick] + 36
    sleep T/4
  end
end
```

This system scales well for samples too.  Now to figure out how to scale this out to OSC-driver browser visualizations.

For now, check out a markov-chain-powered remix of "Hotline Bling" by Drake I auto-composed using this technique on YouTube:

<iframe width="560" height="315" src="https://www.youtube.com/embed/4SemYvZ58FU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
