export const trio = [9, 10, 11];
export const weightedScore = (scores, active, captain) => Math.round(
  scores.reduce((sum, {id, score}) => sum + score * (id === captain ? 2 : active.includes(id) ? 1 : .5), 0)
);

export function transfer(state, players, incoming, outgoing, quotedPrice) {
  const from = state.owned[incoming[0]];
  if (!from || from === state.team || !incoming.length || incoming.length !== outgoing.length ||
      new Set([...incoming, ...outgoing]).size !== incoming.length * 2 ||
      incoming.some(id => state.owned[id] !== from) ||
      outgoing.some(id => state.owned[id] !== state.team) ||
      outgoing.some(id => trio.includes(id)) ||
      (incoming.some(id => trio.includes(id)) && !trio.every(id => incoming.includes(id)))) return false;
  const cost = quotedPrice ?? incoming.reduce((sum, id) => sum + (players.find(p => p.id === id)?.price ?? Infinity), 0);
  if (state.credits < cost) return false;
  incoming.forEach(id => state.owned[id] = state.team);
  outgoing.forEach(id => state.owned[id] = from);
  state.credits -= cost;
  return true;
}
export const abilities = [
 {official:.3, absence:.06}, {wide:.32,narrow:-.14}, {captain:.24,reserve:-.25}, {swing:.78,form:.24},
 {wide:.32,fatigue:.05}, {official:.24,absence:.06}, {book:.55,local:-.22,bookXP:15}, {official:.22,absence:.09},
 {trio:.35,team:.22}, {trio:.27,swing:.42}, {trio:.3,team:.28}, {official:-.22,trainXP:10},
 {national:.28,team:-.1}, {national:.65,local:-.12}, {swing:.32,local:.12}, {wide:.32,swing:.25},
 {local:.18,team:-.12}, {team:.22,absence:.08}, {narrow:.28,wide:-.12}, {trainTeam:12,bookTeam:7,official:-.12},
 {narrow:.23,wide:-.13}, {book:.2,official:-.12}, {official:.2,swing:.08}, {wide:.4,narrow:-.12},
 {trainXP:18,official:-.15}, {narrow:.4,wide:-.25}, {book:.38,bookXP:15,local:-.13}, {official:.27,local:-.12},
 {local:.34,national:-.14}, {team:.3,captain:.14}, {narrow:.32,wide:-.17}, {book:.42,bookXP:15,official:-.12},
 {narrow:.22,wide:-.18}, {income:80,official:-.12}, {wide:.34,team:.16,swing:.18}, {team:.24,fatigue:.035},
 {local:.27,team:.22}, {official:.25,fatigue:.03}, {narrow:.34,wide:-.15}, {captain:.3,team:-.13}
];
