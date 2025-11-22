'use client';

import { useEffect, useState } from 'react';

type Passenger = {
  passengerID: string;
  passportID: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  nation: string | null;
  email: string | null;
};

export default function PassengersPage() {
  const [data, setData] = useState<Passenger[]>([]);

  const load = async () => {
    const res = await fetch('http://localhost:7070/api/passengers');
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Passengers</h1>
      <button onClick={load}>Reload</button>

      <table border={1} cellPadding={4} style={{ marginTop: 12 }}>
        <thead>
          <tr>
            <th>PassengerID</th>
            <th>Passport</th>
            <th>Name</th>
            <th>Nation</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.passengerID}>
              <td>{p.passengerID}</td>
              <td>{p.passportID}</td>
              <td>
                {[p.firstName, p.middleName, p.lastName]
                  .filter(Boolean)
                  .join(' ')}
              </td>
              <td>{p.nation}</td>
              <td>{p.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
