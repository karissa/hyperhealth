module.exports = function (feed) {
  // works with hyperdrive archives or hypercore feeds
  feed.open(function () {
    if (feed.content) {
      feed.content.get(0, function (data) {
        // hack to get data
      })
    }
  })

  function get () {
    if (feed.content) feed = feed.content
    if (!feed.peers) return
    var blocks = feed.blocks
    var peers = []

    for (var i = 0; i < feed.peers.length; i++) {
      var have = 0
      var peer = feed.peers[i]

      if (!peer.stream || !peer.stream.remoteId) continue

      for (var j = 0; j < blocks; j++) {
        if (peer.remoteBitfield.get(j)) have++
      }

      if (!have) continue
      peers.push({id: peer.stream.remoteId.toString('hex'), have: have, blocks: feed.blocks})
    }

    return {
      bytes: feed.bytes,
      blocks: feed.blocks,
      peers: peers,
    }
  }

  return {
    get: get
  }
}
