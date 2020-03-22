How to release Chrysalis
========================

This is a work in progress document that explains the general steps of cutting a
Chrysalis release. Some of this could - and should - be automated better, any
help that gets us going towards that is most appreciated.

First and foremost, we need to update the version in
[package.json](../package.json). If it's a bugfix release, bump the last number.
If it has considerable amount of new features, bump the middle one and zero the
last. Until we're in beta, we're keeping the major version at zero.

Once the version is bumped, make sure that the firmware files shipped with
Chrysalis are up to date. Hop over to the
[Chrysalis-Firmware-Bundle][repo:bundle] repository, update the sketches if need
be, commit the results, push it, and tag it with the same version as Chrysalis.
Then come back to this repo, and run `yarn run firmware:update`, which will pull
the latest firmware bundle, compile it, and refresh the shipped hexes. If those
changed, commit them as well. Do note that this assumes you have a firmware
build environment already set up. The script will not do that for you.

 [repo:bundle]: https://github.com/keyboardio/Chrysalis-Firmware-Bundle

With the version bumped and firmware files updated, it is time to update
[NEWS.md](../NEWS.md) with user-visible or otherwise important changes since the
last release. Following the practice in earlier versions is the recommended way
to do that. It is important to keep in mind that the NEWS file is aimed at end
users, it must not be a filtered copy of the git log, but something a bit more
elaborate, and perhaps considerably less technical in nature.

Once these are done, we can commit them together, and tag the release as
`chrysalis-0.x.y`. Push all that up to GitHub, and wait for Travis to finish.
When Travis is done, download the binariesx, by running
[tools/get-artifact](../tools/get-artifact).

Armed with those, go to GitHub, and prepare a new release. Paste the most recent
NEWS, and upload the binaries downloaded above, and hit the release button.

All of this, except for updating `NEWS.md` could potentially be automated.
