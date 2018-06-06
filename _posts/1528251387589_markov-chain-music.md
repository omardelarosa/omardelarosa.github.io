---
title:   Making Markov Chain Hip Hop with SonicPi
author:  omardelarosa
timestamp: 1528251387589
created_at: 1528251387589
published_at: 1528251387589
slug:    markov-chain-music
ogDescription: an article about using markov chains and sonicpi to make music by omar delarosa

---

For a long time, I've tried to merge two significant pursuits in my life: music and code.  Although the two are not mutually exclusive, I've pursued them each relatively independently of one another.  Or at least, [my primary music project, Little Insects](https://littleinsects.bandcamp.com/) has never been overtly "high tech".

*(Though, under the hood, it very much has been a product of using a lot of digital recording software like Logic and hardware/software synthesizers.  For the purposes of this post, however, I shall create a temporary dichotomy between "high" and "low" tech musics.)*

However, a few weeks ago, I stumbled upon a satisfactorily "high tech" form of music-making that simultaneously scratches both itches.  During a conversation about digital music making at last month's, hip-hop themed [monthly music hackathon](http://monthlymusichackathon.org/) in NYC I was introduced to [SonicPi](https://sonic-pi.net/) by another attendee.  Although I had recently dabbled in some (as of now non-public) experiments with hip hop production and trap beats, these failed to properly merge music and code for me.  Manually programming beats in Logic Pro felt "mid tech" at best, but not "high tech".

For years, I'd known people who used code to make music with tools such as Pure Data and Max/MSP and experimented with those tools myself, but I found them to be too un-intuitive for my tastes as a musician (perhaps so "high tech" it was tough for me to make interesting music with them).  SonicPi, on the other hand, has a really intuitive syntax that I liked for expressing pieces of music as blocks associated with event-like ruby symbols, much closer to how my own brain is wired to think about music:

```ruby
live_loop :melody do
    play (ring :d, :f, :a, :f).tick
    sleep 0.25
end
```

SonicPi's creator, [Sam Aaron, seems to have the right idea](https://www.youtube.com/watch?v=ENfyOndcvP0) making something that's both a good teaching tool and a useful, "real" musical instrument.  This does a good job of satisfying my intuitiveness requirements for this kind of too.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ENfyOndcvP0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


So now, I had a good starting point, but I didn't feel like what I was making was really listenable just yet.  Or at least, I didn't know how to make it feel more like music and not just noodling.

I then started doing some research online and stumbled about another interesting figure:  Andrew Sorensen.  His video "The Concert Programmer" really inspired me by suggesting a system with which to select notes via state machines and markov chaining.

<iframe width="560" height="315" src="https://www.youtube.com/embed/yY1FSsUV-8c" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Although Sorensen used a Scheme-based programming language for his live coding music, I was easily able to translate some of Sorensen's ideas into SonicPi and came up with a system of helper functions and hashes to represent the random note selection process using the state-management methods `set` and `get` in SonicPi:

```ruby

# State management functions
define :markov do |a, h| h[a].sample; end # Chooses the next state at  random from hash
define :g do |k| get[k]; end # simplified root note in scale getter
define :s do |k, n| set k, n; end # simplified root note setter
define :mnote do |key,chain| s key, (markov (g key), chain); g key; end
```

Using these helper functions, you can represent the data as follows:

```ruby
# Scale as a ring in SonicPi
sc = (scale 62, :minor)

# Hash representation of the state machine
H = {
  8 => [0],
  7 => [8],
  6 => [2],
  5 => [2, 2, 0, 0, 7, 7], # the repeated values for "weighted" randomization via .sample
  4 => [1, 1, 2, 2, 6, 6],
  3 => [5],
  2 => [4, 4, 0],
  1 => [3, 3, 3, 0, 0, 0],
  0 => [-2, 2, 4, 4, 0],
  -1 => [-3, -3, 0, 0],
  -2 => [-4, -4, 0],
  -3 => [-5],
  -4 => [-1, -1, -2, -2, -6, -6],
  -5 => [-2, -2, 0, 0, -7, -7],
  -6 => [2],
  -7 => [8],
  -8 => [0],
}
```

Afterwards, you can then generate a markov-ized, 16th note melody in your `live_loop` as follows:

```ruby
M = 4.0 # measure length -- helps make timing more sane

live_loop :lead do
  use_synth :piano  # select piano sound
  n = mnote :n, N   # choose next note in chain and update state
  play sc[n]        # play the nth note in the scale sc
  sleep M / 16      # set 1/16th note duration
end
```

To see this in action, here's a brief video I made using this system to generate a backing track to [The Weeknd's "High For This"](https://www.youtube.com/watch?v=sX9DgavXiN4).  All of the melodic components use this system:

<iframe width="560" height="315" src="https://www.youtube.com/embed/GhzMj-6Js2Y" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


*NOTE: I have posted all the code for that video and [a slightly more detailed explanation with a neat graph as a gist.](https://gist.github.com/omardelarosa/e962e595de9bd1b7f94afde803997831)*

For now, I am still experimenting with how to make more intricate music using this system.  For example, I would like to better randomize beat programming with this system in the near future.  However, I will probably save that for a future post.