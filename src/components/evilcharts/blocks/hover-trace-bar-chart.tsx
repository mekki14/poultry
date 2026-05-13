"use client";

import {
  Bar,
  BarChart,
  Rectangle,
  ReferenceLine,
  Tooltip,
  XAxis,
  type BarShapeProps,
  type CartesianViewBox,
} from "recharts";
import { type ChartConfig, ChartContainer } from "@/components/evilcharts/ui/chart";
import { useMotionValueEvent, useSpring } from "motion/react";
import NumberFlow from "@number-flow/react";
import * as React from "react";

const CHART_MARGIN = 38;

type ChartDataItem = Record<string, string | number>;

export function EvilHoverTraceBarChart({
  data,
  chartConfig,
  dataKey = "value",
  labelKey = "label",
  title = "Value",
  format,
  className,
}: {
  data: ChartDataItem[]
  chartConfig: ChartConfig
  dataKey?: string
  labelKey?: string
  title?: string
  format?: Parameters<typeof NumberFlow>[0]["format"]
  className?: string
}) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const maxData = React.useMemo(
    () =>
      data.reduce<{ index: number; label: string | number; value: number }>(
        (max, item, index) => {
          const val = Number(item[dataKey]) || 0;
          return val > max.value ? { index, label: item[labelKey], value: val } : max;
        },
        { index: 0, label: data[0]?.[labelKey] ?? "", value: Number(data[0]?.[dataKey]) || 0 },
      ),
    [data, dataKey, labelKey],
  );

  const selectedData =
    activeIndex != null && data[activeIndex]
      ? {
          index: activeIndex,
          label: data[activeIndex][labelKey],
          value: Number(data[activeIndex][dataKey]) || 0,
        }
      : maxData;

  const valueSpring = useSpring(selectedData.value, {
    stiffness: 110,
    damping: 20,
  });
  const [springValue, setSpringValue] = React.useState(selectedData.value);

  const handleBarHover = React.useCallback(
    (index: number) => {
      setActiveIndex(index);
      valueSpring.set(Number(data[index]?.[dataKey]) || maxData.value);
    },
    [data, dataKey, maxData.value, valueSpring],
  );

  useMotionValueEvent(valueSpring, "change", (latest) => {
    setSpringValue(Math.round(latest));
  });

  return (
    <div className="flex h-full flex-col p-6">
      <div className="mb-6 flex items-end justify-between border-b border-dashed pb-4">
        <div className="space-y-1">
          <p className="font-heading text-sm font-bold text-kitov-red/70 text-xs uppercase tracking-widest">{title}</p>
          <p className="font-heading text-4xl font-black text-kitov-dark tracking-tight">
            <NumberFlow
              value={selectedData.value}
              format={format as any}
            />
          </p>
        </div>

        <div className="space-y-1 text-left">
          <p className="font-heading text-[10px] font-bold text-kitov-red/50 uppercase tracking-wider">{"الاختيار"}</p>
          <p className="font-heading text-sm font-bold text-kitov-dark">{String(selectedData.label)}</p>
        </div>
      </div>

      <ChartContainer config={chartConfig} className={className}>
        <BarChart
          accessibilityLayer
          data={data}
          margin={{ left: CHART_MARGIN }}
          onMouseMove={(state) => {
            if (state?.activeTooltipIndex != null) {
              handleBarHover(Number(state.activeTooltipIndex));
            }
          }}
          onMouseLeave={() => {
            setActiveIndex(null);
            valueSpring.set(maxData.value);
          }}
        >
          <XAxis
            dataKey={labelKey}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value: string) => (value ? value.slice(0, 5) : "")}
          />

          <Tooltip cursor={false} content={() => null} />

          <Bar
            dataKey={dataKey}
            fill="var(--color-value-0)"
            radius={6}
            shape={(props: BarShapeProps) => (
              <HoverTraceBarShape {...props} highlightedIndex={selectedData.index} />
            )}
            activeBar={(props: BarShapeProps) => (
              <HoverTraceBarShape {...props} highlightedIndex={selectedData.index} />
            )}
          />

          <ReferenceLine
            y={springValue}
            stroke="var(--color-kitov-red)"
            strokeDasharray="4 4"
            strokeWidth={2}
            label={<HoverTraceLabel value={selectedData.value} />}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

interface HoverTraceLabelProps {
  viewBox?: CartesianViewBox;
  value: number;
}

const HoverTraceLabel = ({ viewBox, value }: HoverTraceLabelProps) => {
  const x = viewBox?.x ?? 0;
  const y = viewBox?.y ?? 0;
  const formattedValue = value.toLocaleString();
  const width = formattedValue.length * 9 + 16;

  return (
    <>
      <rect
        x={x - CHART_MARGIN}
        y={y - 11}
        width={width}
        height={22}
        fill="#E31E24"
        rx={6}
      />
      <text
        className="font-heading text-[12px]"
        fontWeight={700}
        x={x - CHART_MARGIN + 8}
        y={y + 5}
        fill="#ffffff"
      >
        {formattedValue}
      </text>
      <ellipse cx={"99%"} cy={y} rx={4} ry={4} fill="#E31E24" />
    </>
  );
};

type HoverTraceBarShapeProps = BarShapeProps & {
  highlightedIndex: number;
};

const HoverTraceBarShape = (props: HoverTraceBarShapeProps) => {
  const { x, y, width, height, fill, index, isActive, highlightedIndex } = props;

  const fillOpacity = isActive || index === highlightedIndex ? 0.9 : 0.15;

  return (
    <g>
      <Rectangle {...props} fill="transparent" pointerEvents="all" />
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        radius={6}
        fill={fill}
        fillOpacity={fillOpacity}
        stroke={isActive ? "#E31E24" : undefined}
        strokeOpacity={isActive ? 0.5 : undefined}
        strokeWidth={isActive ? 1.5 : undefined}
        className="transition-all duration-200"
      />
    </g>
  );
};
