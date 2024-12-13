import { Sector } from "recharts";

function ActivePieSlice(props) {
    const RADIAN = Math.PI / 180;
    const {
        cx,
        cy,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        midAngle,
        fill
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius - 65) * cos;
    const sy = cy + (outerRadius - 65) * sin;
    return (
        <Sector
            cx={sx}
            cy={sy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
            isAnimationActive={true} 
            animationDuration={500}/>
    );
}

export default ActivePieSlice