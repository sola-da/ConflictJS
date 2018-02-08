import json
import argparse


def getJSONdata(jsonfile):
    print("Reading JSON file " + jsonfile)
    try:
        with open(jsonfile) as json_file:
            return json.load(json_file)
    except FileNotFoundError:
        print("Please provide a correct file path. Eg. ./results/validated-conflicts.json")
        return False


def getLibs(key):
    sans_type = key.split('ß')[1]
    sans_accessPath = sans_type.split('°')[0]
    return sans_accessPath.split(',')


def gettypeOfTest(key):
    return key.split('ß')[0]


def getAccessPath(key):
    ap = key.split('°')[-1]
    if ap == 'µ':
        return '_'
    else:
        return ap


def parsedata(raw_data):
    accessPath_toLibs = {}
    uniquelibs = set()
    type_of_conflict = []
    type_of_conflict_toLibs = {}
    type_of_conflict_tolibPair = {}

    for key in raw_data:
        libs = getLibs(key)
        access_path = getAccessPath(key)
        type_of_intfr = gettypeOfTest(key)

        if access_path not in accessPath_toLibs:
            accessPath_toLibs[access_path] = set()
        if type_of_intfr not in type_of_conflict_toLibs:
            type_of_conflict_toLibs[type_of_intfr] = set()
        if type_of_intfr not in type_of_conflict_tolibPair:
            type_of_conflict_tolibPair[type_of_intfr] = set()

        combined_libs = set()
        for lib in libs:
            accessPath_toLibs[access_path].add(lib)
            uniquelibs.add(lib)
            combined_libs.add(lib)
            type_of_conflict_toLibs[type_of_intfr].add(lib)

        cm_list = list(combined_libs)
        cm_list.sort()
        cm_list = ['__'.join(cm_list[:])]
        type_of_conflict_tolibPair[type_of_intfr].add(cm_list[0])
        type_of_conflict.append(type_of_intfr)
    return [accessPath_toLibs, uniquelibs, type_of_conflict_tolibPair]


def validated_conflicts_data(validatedConflicts_File):
    raw_validated = getJSONdata(validatedConflicts_File)
    if raw_validated:
        parsed = parsedata(raw_validated)
        prettyPrint(parsed)
        return parsed


def prettyPrint(data):
    libs_to_accesspaths = {}
    for key in data[0]:
        libs = tuple(data[0][key])
        if libs in libs_to_accesspaths:
            libs_to_accesspaths[libs].append(key)
        else:
            libs_to_accesspaths[libs] = []
            libs_to_accesspaths[libs].append(key)
    for lib in libs_to_accesspaths:
        print("\n- Libraries ", lib, " conflict over ", len(libs_to_accesspaths[lib]), " accesspath/s called ",
              libs_to_accesspaths[lib])
    return


def main():
    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument('filepath', metavar='filepath', nargs=1,
                        help='Path to the JSON file containing the validated conflicts Eg. ./results/validated-conflicts.json')
    args = parser.parse_args()
    validated_conflicts_data(args.filepath[0])

if __name__ == '__main__':
    main()
