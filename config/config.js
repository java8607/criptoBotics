// VALIDATORS....
const latestVersion = '047a'
const validVersions = ['0.47a','0.53']
const validClients  = ["Cryptobot"]
const superUsers    = [
  "pepo",
  "PEPO----PEPO",
  "daygris",
  "jonysaf",
  "julianbeco",
  "garymat",
  "vicru",
  "serch",
  "tatisan",
  "juancada",
  "lorewil",
  "maurozul",
]
const downloadURL = "https://bot.cryptobotics.co/downloads/"

function isSuperUser(username){
  if (superUsers.indexOf(username) !== -1) {
    console.log("Super User",username)
    return true
  }
  return false
}

function isValidClientVersion(agentstring){
  const agent = agentstring.split(" ")
  //console.log(agent)
  if (agent.length > 1) {
    if(validClients.indexOf(agent[0]) !== -1){
      //console.log("valid Client",agent[0])
      if (validVersions.indexOf(agent[1]) !== -1) {
        //console.log("valid Version",agent[1])
        return true
      }
    }
  }
  console.log("INVALID", agent)
  return false
}


function isValidClient(agentstring){
  const agent = agentstring.split(" ")
  //console.log(agent)
  if (agent.length > 1) {
    if(validClients.indexOf(agent[0]) !== -1){
      return true
    }
  }
  console.log("INVALID", agent)
  return false
}


module.exports = {
  isSuperUser : isSuperUser,
  isValidClient : isValidClient,
  isValidClientVersion : isValidClientVersion,
  downloadURL : downloadURL,
  latestVersion :latestVersion,
}


