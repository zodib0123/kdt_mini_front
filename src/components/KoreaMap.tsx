'use client';

import { useEffect, useState } from 'react';
import {
    ComposableMap,
    createLatitude,
    createLongitude,
    Geographies,
    Geography,
} from '@vnedyalk0v/react19-simple-maps';
import { feature } from 'topojson-client';

const facilityCountByProvince: Record<string, number> = {
    Seoul: 120,
    'Gyeonggi-do': 340,
    Busan: 95,
    Incheon: 80,
    Daegu: 60,
    Gwangju: 45,
    Daejeon: 50,
    Ulsan: 40,
    'Chungcheongbuk-do': 55,
    'Chungcheongnam-do': 70,
    'Jeollabuk-do': 65,
    'Jeollanam-do': 75,
    'Gyeongsangbuk-do': 85,
    'Gyeongsangnam-do': 90,
    Jeju: 30,
};

function getColor(count?: number) {
    if (!count) return '#F5F5F5';
    if (count > 300) return '#1B5E20';
    if (count > 200) return '#2E7D32';
    if (count > 100) return '#66BB6A';
    return '#C8E6C9';
}

export default function KoreaMap() {
    const [geoData, setGeoData] = useState<any>(null);

    useEffect(() => {
        fetch('/maps/skorea-provinces-topo.json')
            .then((res) => res.json())
            .then((topology) => {
                const geoJson = feature(
                    topology,
                    topology.objects['skorea-provinces-geo']
                );
                setGeoData(geoJson);
            });
    }, []);

    if (!geoData) return <div>지도 로딩 중...</div>;

    const longitude = createLongitude(128.2);
    const latitude = createLatitude(36.3);


    return (
        <div className="">
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    center: [longitude, latitude],
                    scale: 6000,
                }}
                width={700}
                height={800}
                style={{ width: '100%', height: 'auto' }}
            >
                <Geographies geography={geoData}>
                    {({ geographies }) =>
                        geographies.map((geo, idx) => {
                            const province =
                                geo.properties?.name ||
                                geo.properties?.NAME_1 ||
                                geo.properties?.NAME;

                            const count = facilityCountByProvince[province];

                            return (
                                <Geography
                                    key={`${province}-${idx}`}
                                    geography={geo}
                                    fill={getColor(count)}
                                    stroke="#555"
                                    strokeWidth={0.8}
                                    style={{
                                        default: { outline: 'none' },
                                        hover: {
                                            fill: '#FFB300',
                                            outline: 'none',
                                            cursor: 'pointer',
                                        },
                                        pressed: {
                                            outline: 'none',
                                        },
                                    }}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
        </div>
    );
}