import { Handle } from "reactflow";


export function HandleLeft({ isConnectable, ...params }) {
  return (
    <Handle type="target" position="left" className="handle-left-custom" isConnectable={isConnectable} {...params} />
  );
}
