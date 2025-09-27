import { useNavigate } from "react-router";

interface IProps {
    id: string;
    name: string;
    updatedAt: Date;
}

export default function MiniBoard({
    id,
    name,
    updatedAt
}: IProps) {
  const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/board/${id}`)}
            className="relative w-[150px] h-[150px] bg-[#252525] mr-[20px] flex justify-center rounded-[16px] flex-col cursor-pointer
            border border-transparent
            hover:border hover:border-white/50
            transition-all duration-300 ease-in-out
            "
          >
            <div className="w-full h-[50px] absolute rounded-t-[16px] top-0 bg-[#2c2c2c] pointer cursor-pointer"></div>
            <p className="ml-[20px]">{name}</p>
          </div>  
    )
}
