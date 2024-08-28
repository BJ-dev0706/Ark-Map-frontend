

export const MBP_Small = (json) => {
    let result = [];
    
    const arrayData = Object.keys(json.body.mbp_small).length !== 0 && Object.keys(json.body.mbp_small).map(key => {
        return {
          id: key,
          ...json.body.mbp_small[key]
        };
      });
    
    result = arrayData || [];

    return result;
}

export const MBP_Large = (json) => {
    let result = [];
    
    const arrayData = Object.keys(json.body.mbp_large).length !== 0 &&Object.keys(json.body.mbp_large).map(key => {
        return {
          id: key,
          ...json.body.mbp_large[key]
        };
      });

    result = arrayData || [];

    return result;
}

export const MBP_Admin = (json) => {
    let result = [];

    const arrayData = Object.keys(json.body.mbp_admin).length !== 0 && Object.keys(json.body.mbp_admin).map(key => {
        return {
          id: key,
          ...json.body.mbp_admin[key]
        };
      });

    result = arrayData || [];

    return result;
}

export const Players = (json) => {
    let result = [];

    const arrayData = Object.keys(json.body.players).length !== 0 && Object.keys(json.body.players).map(key => {
        return {
          id: key,
          ...json.body.players[key]
        };
      });

    result = arrayData || [];

    return result;
}

