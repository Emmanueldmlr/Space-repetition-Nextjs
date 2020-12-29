import { useRouter } from "next/router";
import CalendarHeatmap from 'react-calendar-heatmap';



const HeatMap = () => {
    const data = [
        { date: '2020-01-01', count: 1  },
        { date: '2020-02-22', count: 2  },
        { date: '2020-03-10', count: 4  },
        { date: '2020-04-13', count: 3  },
        { date: '2020-06-22', count: 1  },
        { date: '2020-07-05', count: 4  },
        { date: '2020-08-12', count: 3  },
        { date: '2020-09-02', count: 2  },
        { date: '2020-12-01', count: 1  },
      ]
    return(
        <CalendarHeatmap
        startDate={new Date('2020-01-01')}
        endDate={new Date('2020-12-31')}
        values={data}
        classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            return `color-scale-${value.count}`;
        }}
      />
    )
}

export default HeatMap